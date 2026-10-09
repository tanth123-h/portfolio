async (page) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => localStorage.removeItem("ocean-paused"));
  await page.reload();
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForFunction(
    () => document.documentElement.dataset.oceanMotion === "running",
  );
  await page.locator("#motion-toggle").click();
  await page.reload();
  await page.waitForFunction(
    () => document.documentElement.dataset.oceanMotion === "paused",
  );
  await page.locator("#motion-toggle").click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => document.documentElement.dataset.oceanMotion === "paused",
  );
  if (!(await page.locator("#motion-toggle").isDisabled()))
    throw new Error("Reduced-motion control is not disabled");
  const firstFrame = await page
    .locator(".water-surface")
    .evaluate((el) => el.toDataURL());
  await page.waitForTimeout(250);
  const secondFrame = await page
    .locator(".water-surface")
    .evaluate((el) => el.toDataURL());
  if (firstFrame !== secondFrame)
    throw new Error("Reduced motion still animates");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForFunction(
    () => document.querySelector(".water-surface").width === 180,
  );
  return {
    pause: "persistent",
    reducedMotion: "respected",
    mobileCanvasWidth: 180,
  };
};
