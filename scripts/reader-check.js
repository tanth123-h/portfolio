async page => {
  await page.reload();
  await page.locator('[data-entry=agri]').click();
  await page.locator('[data-group=pdfs]').click();
  const reader = page.locator('.pdf-preview').first();
  await reader.locator('[data-zoom=in]').click();
  if (await reader.locator('canvas').evaluate(el => el.style.width) !== '125%') throw new Error('Zoom failed');
  await reader.locator('[data-zoom=fit]').click();
  if (await reader.locator('canvas').evaluate(el => el.style.width) !== '100%') throw new Error('Fit failed');
  await reader.locator('.pdf-scroll').evaluate(el => { el.scrollTop = 100; });
  await reader.locator('[data-page=next]').click();
  if (await reader.locator('.pdf-scroll').evaluate(el => el.scrollTop) !== 0) throw new Error('New page did not reset scroll');
  await page.keyboard.press('Escape');
  await page.locator('[data-entry=phishwall-ai]').click();
  await page.locator('[data-group=videos]').click();
  const poster = await page.locator('video').getAttribute('poster');
  if (!poster) throw new Error('Missing video preview');
  return {zoom:'passed',fit:'passed',poster};
}
