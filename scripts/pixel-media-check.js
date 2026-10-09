async (page) => {
  const base = new URL(page.url()).origin,
    results = [];
  await page.setViewportSize({ width: 375, height: 850 });
  for (const slug of ["phishwall-ai", "troposense"]) {
    await page.goto(base + "/projects/" + slug);
    await page.locator("[data-group=videos]").click();
    const video = page.locator("video");
    const result = await video.evaluate(async (v) => {
      v.muted = true;
      await v.play();
      await new Promise((r) => setTimeout(r, 1000));
      return { width: v.videoWidth, time: v.currentTime, poster: v.poster };
    });
    if (!result.width || result.time <= 0)
      throw Error(slug + " video did not play");
    await video.evaluate((v) => v.pause());
    results.push({ slug, video: result });
    await page.locator("[data-group=pdfs]").click();
    await page.locator(".pdf-preview canvas").first().waitFor();
    await page.waitForFunction(() => {
      const c = document.querySelector(".pdf-preview canvas");
      return (
        c?.width > 0 &&
        document
          .querySelector(".pdf-controls [role=status]")
          ?.textContent.includes("/")
      );
    });
    const root = page.locator(".pdf-preview").first();
    await root.locator("[data-zoom=in]").click();
    if (
      (await root.locator("canvas").evaluate((c) => c.style.width)) !== "125%"
    )
      throw Error("PDF zoom failed");
    await root.locator("[data-zoom=fit]").click();
    if (
      (await root.locator("canvas").evaluate((c) => c.style.width)) !== "100%"
    )
      throw Error("PDF fit failed");
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      )
    )
      throw Error("PDF causes mobile overflow");
    results.push({ slug, pdf: "rendered and zoomed" });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/projects/grow-a-garden");
  await page.locator("[data-group=pdfs]").click();
  await page.waitForFunction(() =>
    document
      .querySelector(".pdf-controls [role=status]")
      ?.textContent.includes("/"),
  );
  const root = page.locator(".pdf-preview").first();
  const next = root.locator("[data-page=next]");
  if (await next.isEnabled()) {
    await next.click();
    await page.waitForFunction(() =>
      document
        .querySelector(".pdf-controls [role=status]")
        ?.textContent.includes("2 /"),
    );
    results.push({ pagination: "passed" });
  }
  await root.locator("[data-zoom=fullscreen]").click();
  await page.waitForFunction(() => !!document.fullscreenElement);
  await page.evaluate(() => document.exitFullscreen());
  results.push({ fullscreen: "passed" });
  return results;
};
