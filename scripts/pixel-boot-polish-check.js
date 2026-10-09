async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.evaluate(() =>
    localStorage.setItem("pixel-motion-explicit", "on"),
  );
  const colors = [];
  for (const [theme, width] of [
    ["sky", 1440],
    ["mint", 375],
    ["dusk", 320],
    ["sky", 768],
    ["mint", 1024],
  ]) {
    await page.evaluate(
      (value) => localStorage.setItem("pixel-wallpaper", value),
      theme,
    );
    await page.setViewportSize({ width, height: 900 });
    await page.reload();
    await page.waitForTimeout(750);
    const failures = await page.evaluate(async () => {
      const errors = [];
      for (let i = 0; i < 48; i++) {
        const frame = document
          .querySelector(".boot-monitor")
          .getBoundingClientRect();
        for (const selector of [
          ".boot-display",
          ".boot-walker svg",
          "#boot-progress",
        ]) {
          const rect = document.querySelector(selector).getBoundingClientRect();
          if (
            rect.left < frame.left + 7 ||
            rect.right > frame.right - 7 ||
            rect.top < frame.top + 7 ||
            rect.bottom > frame.bottom - 7
          )
            errors.push(selector);
        }
        if (document.querySelector(".boot-ready")) break;
        await new Promise(requestAnimationFrame);
      }
      return [...new Set(errors)];
    });
    check(
      !failures.length,
      `Inner screen overflow at ${theme}/${width}: ${failures}`,
    );
    await page.locator("#boot-screen.boot-ready").waitFor({ timeout: 2000 });
    check(
      await page.evaluate(() => {
        const frame = document
          .querySelector(".boot-monitor")
          .getBoundingClientRect();
        return [".boot-display", ".boot-walker svg", "#boot-progress"].every(
          (selector) => {
            const rect = document
              .querySelector(selector)
              .getBoundingClientRect();
            return (
              rect.left >= frame.left + 7 &&
              rect.right <= frame.right - 7 &&
              rect.top >= frame.top + 7 &&
              rect.bottom <= frame.bottom - 7
            );
          },
        );
      }),
      `Ready state spills outside ${width}px monitor`,
    );
    check(
      (await page.locator("#boot-percent").textContent()) === "100%",
      "Ready before 100%",
    );
    check(
      (await page
        .locator(".boot-walker svg")
        .evaluate((n) => getComputedStyle(n).animationName)) === "none",
      "Bit still walks when ready",
    );
    check(
      (await page
        .locator(".boot-walker .buddy-arm")
        .evaluate((n) => getComputedStyle(n).animationName)) === "buddy-wave",
      "Bit does not wave at 100%",
    );
    colors.push(
      await page
        .locator(".boot-display")
        .evaluate((n) => getComputedStyle(n).backgroundColor),
    );
    if (width === 320)
      await page.screenshot({
        path: "output/playwright/pixel-boot-ready-mobile.png",
      });
    await page.locator("#boot-skip").click();
  }
  check(
    new Set(colors.slice(0, 3)).size === 3,
    "Boot themes all use the same screen color",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator(".scene-launch").click();
  check(
    (await page.locator(".scene-click-ripple").count()) === 1,
    "Island click ripple missing",
  );
  await page.waitForTimeout(900);
  check(
    (await page.locator(".scene-click-ripple").count()) === 0,
    "Ripple not cleaned up",
  );
  await page.locator("[data-window-close=projects]").click();
  await page.locator(".desktop-icon[data-app=achievements]").click();
  const depa = page
    .locator("#achievement-files .file-card")
    .filter({ hasText: "depa 2026:" })
    .first();
  await depa.scrollIntoViewIfNeeded();
  check(
    (await depa.locator("img").getAttribute("src")).includes(
      "photos-depa-2026-event-2-jpg",
    ),
    "depa card still uses the school photo",
  );
  await depa.locator("img").evaluate((n) => n.decode());
  return {
    passed: true,
    checks:
      "inner frame/Bit/bar containment through late progress, ready/wave, three themes, five widths, island ripple",
  };
};
