async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  const origin = new URL(page.url()).origin;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin);
  await page.evaluate(() => {
    localStorage.setItem("pixel-language", "en");
    localStorage.setItem("pixel-motion-explicit", "on");
  });
  await page.reload();
  if (await page.locator("#boot-screen").evaluate((n) => n.open))
    await page.locator("#boot-skip").click();
  const icon = page.locator('.desktop-icon[data-app="projects"]');
  await icon.focus();
  check(
    await icon.evaluate((n) =>
      getComputedStyle(n, "::after").content.includes("projects"),
    ),
    "Keyboard icon tooltip missing",
  );
  await page.locator('.desktop-icon[data-app="achievements"]').click();
  await page.locator('[data-filter="activity"]').click();
  await page.locator('[data-search="achievements"]').fill("TIRA");
  check(
    (await page.locator('[data-window="achievements"] .file-card').count()) ===
      1,
    "Search not combined with activity filter",
  );
  await page.locator("#language-toggle").click();
  check(
    (await page.locator('[data-search="achievements"]').inputValue()) ===
      "TIRA",
    "Language switch discarded search",
  );
  check(
    (await page
      .locator('[data-filter="activity"]')
      .getAttribute("aria-pressed")) === "true",
    "Language switch discarded filter",
  );
  await page.goto(origin + "/projects/grow-a-garden");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw Error("Denied");
        },
      },
    }),
  );
  await page.locator("[data-copy-story]").click();
  check(
    (await page.locator(".manual-copy input").inputValue()) ===
      origin + "/projects/grow-a-garden",
    "Manual copy fallback missing",
  );
  await page.locator('[data-group="photos"]').click();
  await page.locator(".media-image").first().click();
  check(
    (await page.locator(".lightbox-caption").count()) === 1,
    "Photo caption missing from viewer",
  );
  check(
    (await page.locator(".lightbox-caption").innerText()).length > 0,
    "Photo caption empty",
  );
  await page.locator("[data-image-close]").click();
  await page.goto(origin);
  if (await page.locator("#boot-screen").evaluate((n) => n.open))
    await page.locator("#boot-skip").click();
  for (const theme of ["sky", "mint", "dusk"]) {
    await page.locator(`[data-world="${theme}"]`).click();
    check(
      await page
        .locator("#pixel-buddy .buddy-arm")
        .evaluate((node) => node.getAnimations().length > 0),
      "Bit arm does not react to theme",
    );
    const states = await page.locator(".buddy-prop").evaluate((node) => {
      const animation = node.getAnimations()[0];
      animation.pause();
      animation.currentTime = 15000;
      const visible = getComputedStyle(node).opacity;
      animation.currentTime = 2000;
      return { visible, hidden: getComputedStyle(node).opacity };
    });
    check(
      Number(states.visible) > 0.9 && Number(states.hidden) === 0,
      "Theme prop not really animated",
    );
    const detail = await page.locator(".rare-detail").evaluate((node) => {
      const animation = node.getAnimations()[0];
      animation.pause();
      const duration = animation.effect.getTiming().duration;
      animation.currentTime = duration * 0.9;
      const visible = getComputedStyle(node).opacity;
      animation.currentTime = duration * 0.1;
      return { visible, hidden: getComputedStyle(node).opacity };
    });
    check(
      Number(detail.visible) > 0.4 && Number(detail.hidden) === 0,
      "Rare detail not actually animated",
    );
    await page.locator("#pixel-buddy").click();
    await page.waitForTimeout(50);
    check(
      await page.evaluate(
        () =>
          document.querySelector(".buddy-prop").getBoundingClientRect().right <=
          document.querySelector("#buddy-message").getBoundingClientRect().left,
      ),
      "Bit prop overlaps its message",
    );
    check(
      await page
        .locator(".buddy-prop")
        .evaluate((node) => Number(getComputedStyle(node).opacity) > 0.9),
      "Click Bit does not reveal theme reaction",
    );
    await page.waitForTimeout(850);
  }
  await page.locator("#motion-notice [data-motion]").click();
  check(
    await page
      .locator(".buddy-prop")
      .evaluate((n) => n.getAnimations().length === 0),
    "Motion-off kept new animation",
  );
  await page.locator('.desktop-icon[data-app="about"]').click();
  await page.locator('[data-window-close="about"]').click();
  check(
    (await page.locator('[data-window="about"]').count()) === 0,
    "Motion-off close delayed",
  );
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('.desktop-icon[data-app="projects"]').click();
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Archive overflow at " + width,
    );
    await page.locator('[data-window-close="projects"]').click();
  }
  await page.evaluate(() => {
    localStorage.setItem("pixel-motion-explicit", "on");
    localStorage.setItem("pixel-language", "en");
  });
  return {
    tooltip: true,
    bilingualFilters: true,
    clipboardFallback: true,
    photoCaption: true,
    actualThemeAnimation: true,
    motionOff: true,
    archiveMobile: true,
  };
};
