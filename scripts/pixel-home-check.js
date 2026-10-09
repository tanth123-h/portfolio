async (page) => {
  const base = new URL(page.url()).origin,
    errors = [];
  const onError = (err) => errors.push(err.message);
  const check = (value, message) => {
    if (!value) throw Error(message);
  };
  page.on("pageerror", onError);
  try {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base);
    await page.evaluate(() => {
      localStorage.setItem("pixel-motion", "on");
      localStorage.setItem("pixel-language", "en");
      localStorage.setItem("pixel-wallpaper", "sky");
    });
    await page.reload();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const greeting = await page.locator("#buddy-message").textContent();
    await page.locator("#pixel-buddy").focus();
    await page.keyboard.press("Enter");
    check(
      (await page.locator("#buddy-message").textContent()) !== greeting,
      "Mascot keyboard activation did not change the hint",
    );
    check(
      await page
        .locator("#pixel-buddy")
        .evaluate((n) => n.classList.contains("waving")),
      "Mascot wave did not start",
    );
    await page.locator("#pixel-buddy").click();
    check(
      (await page.locator("#buddy-message").textContent()).includes("Mint"),
      "Mascot did not advance to the next hint",
    );
    const scenes = [];
    for (const theme of ["sky", "mint", "dusk"]) {
      await page.locator(`[data-world=${theme}]`).click();
      check(
        (await page
          .locator(`[data-world=${theme}]`)
          .getAttribute("aria-pressed")) === "true",
        "Selected scene control not announced",
      );
      scenes.push(await page.locator(".pixel-scene").innerHTML());
      await page.screenshot({
        path: `output/playwright/pixel-home-${theme}.png`,
        animations: "disabled",
      });
    }
    check(
      new Set(scenes).size === 3,
      "Scene choices only changed the background color",
    );
    await page.reload();
    check(
      (await page.locator("body").getAttribute("data-wallpaper")) === "dusk",
      "Scene selection did not persist",
    );
    await page.locator("#desktop-icons [data-app=settings]").click();
    check(
      (await page
        .locator("button[data-wallpaper=dusk]")
        .getAttribute("aria-pressed")) === "true",
      "Settings did not match homepage selection",
    );
    check(
      (await page
        .locator(".scene-float")
        .evaluate((n) => getComputedStyle(n).animationPlayState)) === "paused",
      "Background did not pause behind app",
    );
    await page.locator("[data-motion]").click();
    await page.locator("[data-window-close=settings]").click();
    await page.locator("#pixel-buddy").click();
    check(
      (await page
        .locator(".scene-float")
        .evaluate((n) => getComputedStyle(n).animationName)) === "none",
      "Motion-off did not stop the scene",
    );
    check(
      (await page
        .locator(".buddy-eyes")
        .evaluate((n) => getComputedStyle(n).animationName)) === "none",
      "Motion-off did not stop the mascot",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => localStorage.setItem("pixel-motion", "on"));
    await page.reload();
    await page.locator("#pixel-buddy").click();
    check(
      !(await page
        .locator("#pixel-buddy")
        .evaluate((n) => n.classList.contains("waving"))),
      "Reduced motion still started the wave",
    );
    check(
      (await page
        .locator(".scene-float")
        .evaluate((n) => getComputedStyle(n).animationName)) === "none",
      "System reduced motion ignored",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.locator("[data-world=sky]").click();
    await page.mouse.move(1200, 700);
    check(
      (
        (await page.locator("#wallpaper-art").getAttribute("style")) || ""
      ).includes("--look-x"),
      "Desktop parallax not responding",
    );
    await page.locator(".scene-launch").click();
    check(
      await page.locator("[data-window=projects]").isVisible(),
      "Scene click did not open Projects",
    );
    await page.locator("[data-window-close=projects]").click();
    for (const language of ["en", "th"]) {
      if ((await page.locator("html").getAttribute("lang")) !== language)
        await page.locator("#language-toggle").click();
      for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        check(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          "Homepage overflow at " + width,
        );
        const bounds = await page.locator(".world-switcher").boundingBox();
        check(
          bounds.x >= 0 && bounds.x + bounds.width <= width + 1,
          "Scene controls outside screen",
        );
        await page.locator("#pixel-buddy").click();
        if (width === 375)
          await page.screenshot({
            path: `output/playwright/pixel-home-mobile-${language}.png`,
            fullPage: true,
            animations: "disabled",
          });
      }
    }
    check(errors.length === 0, errors.join(", "));
    for (const width of [1024, 1440]) {
      await page.setViewportSize({ width, height: 650 });
      const controls = await page.locator(".world-switcher").boundingBox(),
        dock = await page.locator(".taskbar").boundingBox();
      check(
        controls.y + controls.height <= dock.y,
        "Scene controls hidden behind dock on short desktop",
      );
    }
    return {
      mascot: "click / Enter / hints passed",
      scenes: "3 unique scenes, persisted and synchronized",
      motion: "pause / reduced motion / opt-out / parallax passed",
      responsive: "both languages, 7 widths",
      errors,
    };
  } finally {
    page.off("pageerror", onError);
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
};
