async page => {
  await page.reload();
  const results = [];
  for (const id of ['phishwall-ai', 'troposense']) {
    await page.locator('[data-entry='+id+']').click();
    await page.locator('[data-group=videos]').click();
    const result = await page.locator('video').evaluate(async video => {
      video.muted = true;
      await video.play();
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {time:video.currentTime,width:video.videoWidth,src:video.currentSrc};
    });
    if (result.time <= 0 || result.width !== 1280) throw new Error('Web video failed: '+id);
    results.push({id,...result});
    await page.locator('[data-group=pdfs]').click();
    await page.waitForFunction(() => [...document.querySelectorAll('.pdf-controls [role=status]')].some(el => el.textContent.includes(' / ')));
    const next = page.locator('[data-page=next]').last();
    if (await next.isEnabled()) {
      await next.click();
      await page.waitForFunction(() => [...document.querySelectorAll('.pdf-controls [role=status]')].some(el => el.textContent.includes('2 / ')));
    }
    results.push({id,pdf:'rendered'});
    await page.keyboard.press('Escape');
  }
  return results;
}
