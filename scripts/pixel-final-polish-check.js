async (page) => {
  const check = (ok, message) => {
    if (!ok) throw Error(message);
  };
  const origin = new URL(page.url()).origin;
  await page.goto(origin);
  await page.evaluate(() => {
    localStorage.setItem("pixel-motion-explicit", "on");
    localStorage.setItem("pixel-language", "en");
  });
  await page.reload();
  await page.locator("#boot-skip").click();
  await page.locator('.desktop-icon[data-app="projects"]').click();
  const search = page.locator('[data-search="projects"]');
  check((await search.count()) === 1, "Project search missing");
  await search.fill("GROW garden");
  check(
    (await page.locator('[data-window="projects"] .file-card').count()) === 1,
    "Search did not filter real cards",
  );
  await search.fill("unmatched-xyz");
  check(
    (await page.locator('[data-window="projects"] .file-card').count()) === 0,
    "Unknown search kept cards",
  );
  await page.locator('[data-clear-search="projects"]').click();
  check(
    (await page.locator('[data-window="projects"] .file-card').count()) === 6,
    "Clear did not restore projects",
  );
  await page.locator('[data-window-close="projects"]').click();
  await page.waitForTimeout(250);
  for (const theme of ["sky", "mint", "dusk"]) {
    await page.locator(`[data-world="${theme}"]`).click();
    check(
      (await page
        .locator(`#pixel-buddy .buddy-prop[data-theme="${theme}"]`)
        .count()) === 1,
      "Theme reaction absent",
    );
    check(
      (await page.locator(".rare-detail").count()) === 1,
      "Rare scene detail absent",
    );
  }
  await page.goto(origin + "/projects/phishwall-ai");
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.locator("[data-copy-story]").click();
  check(
    (await page.evaluate(() => navigator.clipboard.readText())) ===
      origin + "/projects/phishwall-ai",
    "Copy used wrong route",
  );
  await page.locator('[data-group="videos"]').click();
  await page.route("**/video-web/**", (route) => route.abort());
  await page.locator("video").evaluate((video) => {
    video.muted = true;
    video.load();
    video.play().catch(() => {});
  });
  await page.locator(".video-status").waitFor({ state: "visible" });
  await page.locator("[data-video-retry]").waitFor({ state: "visible" });
  check(
    (await page.locator(".video-status").innerText()).includes("Could not"),
    "Video error not explained",
  );
  await page.unroute("**/video-web/**");
  await page.locator("[data-video-retry]").click();
  await page.locator("video").evaluate((video) => {
    video.muted = true;
    return video.play();
  });
  await page.waitForTimeout(350);
  check(
    await page.locator("video").evaluate((video) => video.currentTime > 0),
    "Video retry not playable",
  );
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Case overflow at " + width,
    );
  }
  return {
    search: true,
    themeReactions: true,
    copyLink: true,
    videoRecovery: true,
    mobile: true,
  };
};
