async (page) => {
  const base = new URL(page.url()).origin;
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(base);
  await page.evaluate(() => {
    localStorage.setItem("pixel-motion", "on");
    sessionStorage.setItem("pixel-boot-seen", "yes");
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  await page.mouse.move(1200, 650);
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => !!n.style.getPropertyValue("--gaze-x")),
    "Gaze did not follow pointer",
  );
  await page.waitForTimeout(1100);
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => !n.style.getPropertyValue("--gaze-x")),
    "Gaze did not return to idle",
  );
  await page.locator(".task-settings").click();
  await page.evaluate(() => {
    window.portalObserved = false;
    const observer = new MutationObserver(() => {
      if (
        document
          .querySelector("#boot-screen")
          .classList.contains("boot-leaving")
      ) {
        window.portalObserved = true;
        observer.disconnect();
      }
    });
    observer.observe(document.querySelector("#boot-screen"), {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
  await page.locator("[data-replay-intro]").click();
  await page.locator("#boot-screen[open]").waitFor({ state: "hidden" });
  check(
    await page.evaluate(() => window.portalObserved),
    "Portal transition did not run",
  );
  check(
    await page
      .locator("[data-replay-intro]")
      .evaluate((n) => n === document.activeElement),
    "Portal lost keyboard focus",
  );
  await page.locator("[data-replay-intro]").click();
  await page.locator("#boot-skip").click();
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Skip should close immediately",
  );
  await page.locator("[data-window-close=settings]").click();
  for (const width of [320, 375, 430, 768]) {
    await page.setViewportSize({ width, height: 900 });
    check(
      await page.locator("#mobile-tide").isVisible(),
      "Mobile water missing",
    );
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Mobile overflow",
    );
    if (width === 375)
      await page.screenshot({
        path: "output/playwright/pixel-mobile-tide.png",
        fullPage: true,
      });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  check(
    (await page
      .locator("#mobile-tide .water-current")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Mobile tide ignored reduced motion",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.mouse.move(1100, 650);
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => !n.style.getPropertyValue("--gaze-x")),
    "Reduced motion should disable gaze",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return {
    passed: true,
    checks:
      "bounded gaze/reset, portal/focus, immediate skip, four mobile widths, reduced motion",
  };
};
