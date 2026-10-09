async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  check(
    await page.locator("#motion-notice").isVisible(),
    "Missing motion explanation",
  );
  await page.locator("[data-preview-motion]").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) !== "none",
    "Preview did not enable motion",
  );
  await page.mouse.move(1200, 650);
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => !!n.style.getPropertyValue("--gaze-x")),
    "Bit gaze still blocked",
  );
  await page.locator("#pixel-buddy").click();
  check(
    await page
      .locator("#pixel-buddy")
      .evaluate((n) => n.classList.contains("waving")),
    "Bit wave still blocked",
  );
  await page.screenshot({
    path: "output/playwright/pixel-animation-preview.png",
  });
  await page.locator("[data-preview-motion]").click();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Stop preview did not restore reduced motion",
  );
  await page.locator("[data-preview-motion]").click();
  await page.reload();
  check(
    (await page
      .locator(".scene-float")
      .evaluate((n) => getComputedStyle(n).animationName)) === "none",
    "Preview should not persist across reload",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return {
    passed: true,
    checks:
      "explicit preview, actual Bit gaze/wave, stop, reload restores reduced motion",
  };
};
