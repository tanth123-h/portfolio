async (page) => {
  const base = new URL(page.url()).origin,
    errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  const home = async () => {
    await page.goto(base);
    if (await page.locator("#boot-screen").evaluate((n) => n.open))
      await page.locator("#boot-skip").click();
  };
  await home();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator("#desktop-icons [data-app=projects]").click();
  const projects = await page
    .locator("[data-window=projects] .file-card")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
  await page.locator("[data-window-close=projects]").click();
  await page.locator("#desktop-icons [data-app=achievements]").click();
  const achievements = await page
    .locator("[data-window=achievements] .file-card")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
  for (const href of [...projects, ...achievements]) {
    const response = await page.goto(base + href);
    if (response.status() !== 200)
      throw Error(href + " status " + response.status());
    await page.locator("#case-study h1").waitFor();
    const broken = await page
      .locator("#case-study img")
      .evaluateAll(async (nodes) => {
        await Promise.all(nodes.map((n) => n.decode().catch(() => {})));
        return nodes.filter((n) => !n.naturalWidth).map((n) => n.src);
      });
    if (broken.length) throw Error("Broken images at " + href + ": " + broken);
  }
  await home();
  await page.locator("#desktop-icons [data-app=projects]").focus();
  await page.keyboard.press("Enter");
  await page.locator("[data-window=projects] .file-card").first().focus();
  await page.keyboard.press("Enter");
  await page.goBack();
  if (!(await page.locator("[data-window=projects]").isVisible()))
    throw Error("Back did not restore app");
  await page.goForward();
  if (!(await page.locator("#case-study").isVisible()))
    throw Error("Forward did not restore story");
  await home();
  await page.setViewportSize({ width: 375, height: 850 });
  await page.locator("#desktop-icons [data-app=projects]").click();
  await page.locator("[data-launcher]").click();
  await page.locator("#launcher-menu [data-app=contact]").click();
  if (await page.locator("[data-window=projects]").isVisible())
    throw Error("Two mobile apps visible");
  await page.locator("[data-task=projects]").click();
  if (!(await page.locator("[data-window=projects]").isVisible()))
    throw Error("Mobile task switch failed");
  await page.setViewportSize({ width: 1440, height: 1000 });
  if (!(await page.locator("[data-window=contact]").isVisible()))
    throw Error("Desktop resize did not restore other app");
  const missing = await page.request.get(base + "/public/assets/missing.pdf");
  if (missing.status() !== 404) throw Error("Missing media returned HTML");
  if (errors.length) throw Error(errors.join(", "));
  return {
    projectRoutes: projects.length,
    achievementRoutes: achievements.length,
    images: "decoded",
    history: "passed",
    keyboard: "passed",
    mobileSwitch: "passed",
    missingMedia: 404,
    errors,
  };
};
