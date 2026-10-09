async (page) => {
  const base = new URL(page.url()).origin,
    errors = [],
    results = [];
  const onError = (error) => errors.push(error.message);
  page.on("pageerror", onError);
  const check = (condition, message) => {
    if (!condition) throw Error(message);
  };
  const open = (id) =>
    page.locator("#desktop-icons [data-app=" + id + "]").click();
  try {
    await page.goto(base);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    for (const lang of ["en", "th"]) {
      if ((await page.locator("html").getAttribute("lang")) !== lang)
        await page.locator("#language-toggle").click();
      for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        check(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          lang + " desktop overflow " + width,
        );
        await open("projects");
        check(
          (await page.locator("[data-window=projects] .file-card").count()) ===
            6,
          "Expected six projects",
        );
        check(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          lang + " app overflow " + width,
        );
        await page.locator("[data-window-close=projects]").click();
        results.push({ lang, width, overflow: false });
      }
    }
    await page.locator("#language-toggle").click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open("projects");
    const node = page.locator("[data-window=projects]"),
      bar = node.locator(".window-titlebar"),
      before = await node.boundingBox(),
      box = await bar.boundingBox();
    await page.mouse.move(box.x + 100, box.y + 20);
    await page.mouse.down();
    await page.mouse.move(box.x + 220, box.y + 80);
    await page.mouse.up();
    const after = await node.boundingBox();
    check(after.x > before.x, "Window did not drag");
    await page.locator("[data-minimize=projects]").click();
    check(!(await node.isVisible()), "Minimize failed");
    await page.locator("[data-task=projects]").click();
    check(await node.isVisible(), "Restore failed");
    await page.locator("[data-maximize=projects]").click();
    check((await node.boundingBox()).width > 1300, "Maximize failed");
    await page.locator("[data-maximize=projects]").click();
    await open("achievements");
    await page.locator("[data-filter=activity]").click();
    check(
      (await page.locator("#achievement-files .file-card").count()) === 2,
      "Activities not separated",
    );
    await page.locator("[data-filter=competition]").click();
    check(
      (await page.locator("#achievement-files .file-card").count()) === 8,
      "Competition count",
    );
    await page.locator("[data-window-close=achievements]").click();
    for (const id of ["memories", "about", "research", "contact", "settings"]) {
      await open(id);
      check(
        await page.locator("[data-window=" + id + "]").isVisible(),
        id + " failed",
      );
      await page.locator("[data-window-close=" + id + "]").click();
    }
    await node.locator('a[href="/projects/grow-a-garden"]').click();
    check(await page.locator("#case-study").isVisible(), "Case route failed");
    await page.reload();
    check(
      (await page.locator("#case-study h1").textContent()).includes("Grow"),
      "Direct route reload failed",
    );
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      check(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "Story overflow " + width,
      );
    }
    const broken = await page
      .locator("#case-study img")
      .evaluateAll(async (imgs) => {
        await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
        return imgs.filter((i) => !i.naturalWidth).map((i) => i.src);
      });
    check(!broken.length, "Broken images " + broken);
    await page.goto(base + "/achievements/weed-detection-vehicle");
    check(
      (await page.locator("#case-study h1").textContent()).includes(
        "depa 2025",
      ),
      "Achievement direct route failed",
    );
    await page.locator("#case-study [data-home]").first().click();
    await open("memories");
    await page.locator(".album-viewer summary").click();
    await page.locator("[data-album]").filter({ hasText: "→" }).click();
    check(
      (await page.locator(".album-toolbar span").textContent()).startsWith(
        "2 /",
      ),
      "Album next failed",
    );
    await page.locator(".album-main [data-image]").click();
    check(await page.locator("#lightbox").isVisible(), "Lightbox failed");
    await page.keyboard.press("Escape");
    check(
      !(await page.locator("#lightbox").isVisible()),
      "Lightbox Escape failed",
    );
    await page.locator("[data-window-close=memories]").click();
    await open("settings");
    await page.locator("[data-wallpaper=mint]").click();
    await page.locator("[data-motion]").click();
    await page.reload();
    check(
      (await page.locator("body").getAttribute("data-wallpaper")) === "mint",
      "Wallpaper persistence failed",
    );
    check(
      ((await page.locator("body").getAttribute("class")) || "").includes(
        "reduce-motion",
      ),
      "Motion preference failed",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    check(
      await page.evaluate(
        () =>
          getComputedStyle(document.querySelector(".pixel-clouds"))
            .animationName === "none",
      ),
      "Reduced motion failed",
    );
    await page.setViewportSize({ width: 375, height: 850 });
    await open("about");
    check(
      Math.round(
        (await page.locator("[data-window=about]").boundingBox()).width,
      ) === 375,
      "Mobile app not fullscreen",
    );
    await page.keyboard.press("Escape");
    check(!errors.length, "Runtime errors: " + errors.join(", "));
    return {
      viewports: results,
      windowManagement: "passed",
      routes: "passed",
      apps: "passed",
      preferences: "passed",
      errors,
    };
  } finally {
    page.off("pageerror", onError);
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
};
