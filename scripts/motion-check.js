async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(() => localStorage.removeItem('ocean-paused'));
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.oceanMotion === 'running');
  await page.locator('#motion-toggle').click();
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.oceanMotion === 'paused');
  await page.locator('#motion-toggle').click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(() => document.documentElement.dataset.oceanMotion === 'paused');
  if (!await page.locator('#motion-toggle').isDisabled()) throw new Error('Reduced-motion control is not disabled');
  const animation = await page.locator('.ocean-particles i').first().evaluate(el => getComputedStyle(el).animationName);
  if (animation !== 'none') throw new Error('Reduced motion still animates');
  await page.setViewportSize({width:375,height:812});
  await page.waitForFunction(() => document.querySelector('.ocean-particles').childElementCount === 10);
  return {pause:'persistent',reducedMotion:'respected',mobileParticles:10};
}
