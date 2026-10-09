async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.evaluate(() => {
    localStorage.setItem("pixel-motion", "on");
    sessionStorage.setItem("pixel-boot-seen", "yes");
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  for (const [theme, selector, name] of [
    ["sky", ".screen-code", "code-idle"],
    ["mint", ".garden-leaves", "garden-breeze"],
    ["dusk", ".telescope-head", "telescope-scan"],
  ]) {
    await page.locator(`[data-world=${theme}]`).click();
    const node = page.locator(selector);
    check(
      (await node.evaluate((n) => getComputedStyle(n).animationName)) === name,
      theme + " detail animation missing",
    );
    const first = await node.evaluate((n) => getComputedStyle(n).transform);
    await page.waitForTimeout(700);
    check(
      (await node.evaluate((n) => getComputedStyle(n).transform)) !== first,
      theme + " detail not moving",
    );
    await page.screenshot({
      path: `output/playwright/pixel-scene-motion-${theme}.png`,
    });
    await page.locator(".task-settings").click();
    check(
      (await node.evaluate((n) => getComputedStyle(n).animationPlayState)) ===
        "paused",
      theme + " not paused behind app",
    );
    await page.locator("[data-window-close=settings]").click();
    await page.emulateMedia({ reducedMotion: "reduce" });
    check(
      (await node.evaluate((n) => getComputedStyle(n).animationName)) ===
        "none",
      theme + " ignored reduced motion",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
  return {
    passed: true,
    checks:
      "3 independent scene animations, visible transforms, pause behind apps, reduced motion",
  };
};
