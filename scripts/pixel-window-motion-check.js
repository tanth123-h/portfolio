async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.evaluate(() =>
    localStorage.setItem("pixel-motion-explicit", "on"),
  );
  await page.reload();
  await page.locator("#boot-skip").click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.desktop-icon[data-app="about"]').click();
  await page.waitForTimeout(350);
  await page.locator('[data-minimize="about"]').click();
  const animated = await page
    .locator('[data-window="about"]')
    .evaluate((node) => !node.hidden && node.getAnimations().length > 0);
  check(animated, "Minimize hides immediately instead of animating");
  await page.waitForTimeout(250);
  check(
    await page.locator('[data-window="about"]').isHidden(),
    "Minimize did not finish",
  );
  await page.locator('[data-task="about"]').click();
  check(
    await page
      .locator('[data-window="about"]')
      .evaluate((node) => !node.hidden && node.getAnimations().length > 0),
    "Restore animation missing",
  );
  await page.waitForTimeout(300);
  await page.locator('[data-window-close="about"]').click();
  check(
    (await page.locator('[data-window="about"]').count()) === 1,
    "Close removed before animation",
  );
  await page.waitForTimeout(250);
  check(
    (await page.locator('[data-window="about"]').count()) === 0,
    "Close did not remove window",
  );
  check(
    await page
      .locator('.desktop-icon[data-app="about"]')
      .evaluate((node) => node === document.activeElement),
    "Close lost keyboard focus",
  );
  return { minimize: true, restore: true, close: true, focus: true };
};
