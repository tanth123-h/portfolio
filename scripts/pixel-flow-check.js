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
  const flow = await page
    .locator("#wallpaper-art .water-current")
    .evaluate((n) => {
      const c = getComputedStyle(n);
      return [c.animationTimingFunction, c.animationDirection];
    });
  check(
    flow.join() === "linear,normal",
    "Water should flow continuously, not reverse",
  );
  await page.locator(".scene-launch").dispatchEvent("click");
  check(
    (await page.locator(".scene-click-ripple").count()) === 1,
    "Island ripple missing",
  );
  const opening = await page
    .locator("[data-window=projects]")
    .evaluate((n) => ({
      x: n.style.getPropertyValue("--open-x"),
      y: n.style.getPropertyValue("--open-y"),
    }));
  check(opening.x && opening.y, "Window opening origin missing");
  await page.waitForTimeout(850);
  check(
    (await page.locator(".scene-click-ripple").count()) === 0,
    "Ripple not cleaned up",
  );
  await page.locator("[data-window-close=projects]").click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".scene-launch").dispatchEvent("click");
  check(
    (await page.locator(".scene-click-ripple").count()) === 0,
    "Reduced motion should suppress ripple",
  );
  check(
    (await page
      .locator("[data-window=projects]")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Reduced motion should suppress window motion",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return {
    passed: true,
    checks:
      "seamless flow, ripple creation/cleanup, launch origin, reduced motion",
  };
};
