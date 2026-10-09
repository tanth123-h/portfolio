async (page) => {
  const base = new URL(page.url()).origin;
  const check = (value, message) => {
    if (!value) throw Error(message);
  };
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base);
  await page.evaluate(() => {
    sessionStorage.removeItem("pixel-boot-seen");
    localStorage.setItem("pixel-motion", "on");
  });
  await page.reload();
  await page.locator("#boot-screen[open]").waitFor();
  await page.screenshot({ path: "output/playwright/pixel-power-up.png" });
  await page.locator("#boot-skip").click();
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Skip failed",
  );
  await page.reload();
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Intro repeated in same session",
  );
  check(
    (await page
      .locator("#wallpaper-art .water-current")
      .evaluate((n) => getComputedStyle(n).animationName)) === "water-flow",
    "Water flow missing",
  );
  check(
    (await page
      .locator(".buddy-idle")
      .evaluate((n) => getComputedStyle(n).animationName)) === "buddy-idle",
    "Idle animation missing",
  );
  await page.locator(".task-settings").click();
  check(
    (await page
      .locator("#wallpaper-art .water-current")
      .evaluate((n) => getComputedStyle(n).animationPlayState)) === "paused",
    "Water should pause behind apps",
  );
  await page.locator("[data-replay-intro]").click();
  await page.keyboard.press("Escape");
  check(
    await page
      .locator("[data-replay-intro]")
      .evaluate((n) => n === document.activeElement),
    "Focus not restored after Escape",
  );
  await page.locator("[data-replay-intro]").click();
  await page.locator("#boot-screen[open]").waitFor({ state: "hidden" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  check(
    (await page
      .locator("#wallpaper-art .water-current")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Reduced motion ignored",
  );
  await page.evaluate(() => sessionStorage.removeItem("pixel-boot-seen"));
  await page.reload();
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Reduced motion should skip intro",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/projects/grow-a-garden");
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Deep links should bypass intro",
  );
  await page.goto(base);
  await page.locator("#boot-screen[open]").waitFor({ state: "hidden" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator(".task-settings").click();
  await page.locator("[data-replay-intro]").click();
  check(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Mobile overflow",
  );
  await page.screenshot({ path: "output/playwright/pixel-power-mobile.png" });
  await page.locator("#boot-skip").click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.screenshot({ path: "output/playwright/pixel-water-home.png" });
  check(!errors.length, errors.join("; "));
  return {
    passed: true,
    checks:
      "first visit, skip, session persistence, replay, Escape/focus, auto-dismiss, reduced motion, deep link, mobile, water/idle pause",
  };
};
