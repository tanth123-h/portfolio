async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  await page.goto(new URL(page.url()).origin);
  await page.evaluate(() =>
    localStorage.setItem("pixel-motion-explicit", "on"),
  );
  await page.evaluate(() => localStorage.setItem("pixel-wallpaper", "sky"));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  const progress = page.locator("#boot-progress");
  await progress.waitFor({ state: "attached", timeout: 1500 });
  const first = Number(await progress.getAttribute("aria-valuenow"));
  const before = await page
    .locator(".boot-walker")
    .evaluate((n) => getComputedStyle(n).transform);
  await page.waitForTimeout(300);
  check(
    Number(await progress.getAttribute("aria-valuenow")) > first,
    "Progress does not advance",
  );
  check(
    (await page
      .locator(".boot-walker")
      .evaluate((n) => getComputedStyle(n).transform)) !== before,
    "Bit does not walk across the loading bar",
  );
  check(
    await page.evaluate(
      () =>
        document.querySelector("#boot-percent").textContent ===
        `${document.querySelector("#boot-progress").getAttribute("aria-valuenow")}%`,
    ),
    "Percentage and bar disagree",
  );
  await page.screenshot({
    path: "output/playwright/pixel-loading-desktop.png",
  });
  await page.locator("#boot-screen.boot-leaving").waitFor();
  check(
    (await progress.getAttribute("aria-valuenow")) === "100",
    "Exit before reaching 100%",
  );
  await page.locator("#boot-screen[open]").waitFor({ state: "hidden" });
  for (const selector of [
    ".scene-float",
    ".water-current",
    ".buddy-idle",
    ".screen-code",
  ]) {
    check(
      !(
        await page
          .locator(selector)
          .first()
          .evaluate((n) => getComputedStyle(n).animationTimingFunction)
      ).includes("steps"),
      "Stepped motion remains: " + selector,
    );
  }
  await page.reload();
  await page.locator("#boot-skip").click();
  await page.waitForTimeout(2200);
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Skip reopened the loading screen",
  );
  await page.setViewportSize({ width: 320, height: 700 });
  await page.reload();
  await page.locator("#boot-screen[open]").waitFor();
  await page.waitForTimeout(750);
  check(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Loading screen overflows mobile",
  );
  await page.screenshot({ path: "output/playwright/pixel-loading-mobile.png" });
  await page.keyboard.press("Escape");
  check(
    !(await page.locator("#boot-screen").evaluate((n) => n.open)),
    "Escape does not skip",
  );
  return {
    passed: true,
    checks:
      "advancing percentage, walking Bit, 100% before exit, smooth homepage, skip cleanup, mobile and Escape",
  };
};
