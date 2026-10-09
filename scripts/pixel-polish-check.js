async (page) => {
  const base = new URL(page.url()).origin;
  const errors = [];
  const onError = (err) => errors.push(err.message);
  const check = (value, message) => {
    if (!value) throw Error(message);
  };
  const open = (id) => page.locator(`#desktop-icons [data-app=${id}]`).click();
  page.on("pageerror", onError);
  try {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base);
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("pixel-window-"))
        .forEach((k) => localStorage.removeItem(k));
      localStorage.setItem("pixel-language", "en");
      localStorage.setItem("pixel-motion", "off");
      localStorage.setItem("pixel-wallpaper", "sky");
    });
    await page.reload();
    await open("projects");
    const node = page.locator("[data-window=projects]");
    check(
      (await node.locator(".project-label").count()) === 12,
      "Project result labels missing",
    );
    const bar = await node.locator(".window-titlebar").boundingBox();
    await page.mouse.move(bar.x + 160, bar.y + 24);
    await page.mouse.down();
    await page.mouse.move(bar.x + 260, bar.y + 84, { steps: 6 });
    await page.mouse.up();
    const moved = await node.boundingBox();
    await page.reload();
    await open("projects");
    const restored = await node.boundingBox();
    check(
      Math.abs(restored.x - moved.x) < 1 && Math.abs(restored.y - moved.y) < 1,
      "Dragged position was not restored",
    );
    await page.locator("[data-maximize=projects]").click();
    await page.reload();
    await open("projects");
    check(
      await node.evaluate((n) => n.classList.contains("maximized")),
      "Maximized state was not restored",
    );
    check(
      (await node.boundingBox()).width > 1400,
      "Saved maximized window is not fullscreen",
    );
    await page.locator("[data-maximize=projects]").click();
    check(
      Math.abs((await node.boundingBox()).x - moved.x) < 1,
      "Restore lost the normal position",
    );
    const saved = await page.evaluate(() =>
      localStorage.getItem("pixel-window-projects"),
    );
    await page.setViewportSize({ width: 375, height: 850 });
    check(
      Math.round((await node.boundingBox()).width) === 375,
      "Mobile panel not fullscreen",
    );
    await page.locator("[data-window-close=projects]").click();
    check(
      (await page.evaluate(() =>
        localStorage.getItem("pixel-window-projects"),
      )) === saved,
      "Mobile overwrote desktop geometry",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open("projects");
    check(
      Math.abs((await node.boundingBox()).x - moved.x) < 1,
      "Mobile close lost desktop position",
    );
    await page.locator("[data-window-close=projects]").click();
    await page.evaluate(() =>
      localStorage.setItem(
        "pixel-window-projects",
        JSON.stringify({
          x: 300,
          y: 90,
          width: 720,
          height: 500,
          maximized: false,
        }),
      ),
    );
    await open("projects");
    const sized = await node.boundingBox();
    check(
      sized.width === 720 && sized.height === 500,
      "Saved dimensions not restored",
    );
    await page.locator("[data-window-close=projects]").click();
    await open("memories");
    const sheets = [];
    const ids = await page
      .locator("#album-select option")
      .evaluateAll((ns) => ns.map((n) => n.value));
    for (const id of ids) {
      await page.locator("#album-select").selectOption(id);
      const count = await page.locator(".contact-photo").count();
      check(count > 0, "Empty contact sheet " + id);
      await page.locator(".contact-photo img").evaluateAll(async (imgs) => {
        await Promise.all(imgs.map((img) => img.decode()));
      });
      const expected = await page
        .locator(".contact-photo")
        .first()
        .getAttribute("data-image");
      await page.locator(".contact-photo").first().click();
      check(
        (await page.locator("#lightbox img").getAttribute("src")) === expected,
        "Photo viewer opened wrong image",
      );
      await page.keyboard.press("Escape");
      check(
        await page
          .locator(".contact-photo")
          .first()
          .evaluate((n) => n === document.activeElement),
        "Viewer did not restore keyboard focus",
      );
      sheets.push({ id, photos: count });
    }
    await page.locator("#album-select").selectOption(ids[0]);
    await page.screenshot({
      path: "output/playwright/pixel-contact-sheet-desktop.png",
      animations: "disabled",
    });
    await page.setViewportSize({ width: 375, height: 850 });
    check(
      (await page
        .locator(".contact-sheet")
        .evaluate(
          (n) => getComputedStyle(n).gridTemplateColumns.split(" ").length,
        )) === 2,
      "Mobile sheet should have two columns",
    );
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      "Contact sheet causes mobile overflow",
    );
    await page.screenshot({
      path: "output/playwright/pixel-contact-sheet-mobile.png",
      animations: "disabled",
    });
    check(errors.length === 0, errors.join(", "));
    return {
      geometry:
        "drag / reload / maximize / dimensions / mobile isolation passed",
      albums: sheets,
      mobile: "two columns, no overflow",
      errors,
    };
  } finally {
    page.off("pageerror", onError);
  }
};
