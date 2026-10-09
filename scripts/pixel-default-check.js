async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.evaluate(() => localStorage.removeItem("pixel-motion-explicit"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  await page.locator("#boot-screen[open]").waitFor();
  await page.screenshot({ path: "output/playwright/pixel-default-power.png" });
  await page.locator("#boot-skip").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) !== "none",
    "Motion not on by default",
  );
  await page.mouse.move(1200, 650);
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => !!n.style.getPropertyValue("--gaze-x")),
    "Default gaze blocked",
  );
  check(
    await page
      .locator("#wallpaper-art .water-current")
      .evaluate((n) => getComputedStyle(n).animationTimingFunction)
      .then((v) => v === "linear"),
    "Water not smooth",
  );
  await page.locator("#motion-notice [data-motion]").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Off switch failed",
  );
  await page.reload();
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Motion-off should bypass power-up",
  );
  await page.locator("#motion-notice [data-motion]").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) !== "none",
    "On switch failed",
  );
  await page.locator(".task-settings").click();
  check(
    await page.locator("[data-replay-intro]").isEnabled(),
    "Replay should be enabled when motion is on",
  );
  await page.locator("[data-window=settings] [data-motion]").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Settings off failed",
  );
  await page.locator("[data-window=settings] [data-motion]").click();
  await page.locator("[data-window-close=settings]").click();
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Overflow at " + width,
    );
  }
  await page.reload();
  await page.locator("#boot-screen[open]").waitFor();
  await page.locator("#boot-skip").click();
  await page.goto(new URL("/projects/grow-a-garden", page.url()).href);
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Direct project should bypass boot",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return {
    passed: true,
    checks:
      "default power-up/motion with system reduce, gaze, smooth water, home+settings on/off, persistence, replay, five widths, direct links",
  };
};
