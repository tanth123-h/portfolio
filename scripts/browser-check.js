async page => {
  const errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  const results = [];
  try {
    await page.reload();
    if (await page.locator('#projects-grid article').count() !== 5) throw new Error('Project count is not five');
    if (await page.locator('#achievements-grid article').count() !== 7) throw new Error('Activity count is not seven');
    if (await page.locator('#timeline').count()) throw new Error('Timeline still rendered');
    for (const language of ['en','th']) {
      if (await page.locator('html').getAttribute('lang') !== language) await page.locator('#language-toggle').click();
      for (const width of [320,375,430,768,1024,1280,1440,1920]) {
        await page.setViewportSize({width,height:900});
        const geometry = await page.evaluate(() => ({
          viewport:innerWidth, document:document.documentElement.scrollWidth,
          oversized:[...document.querySelectorAll('main article')].filter(el => el.getBoundingClientRect().right > innerWidth+1).length
        }));
        if (geometry.document > width || geometry.oversized) throw new Error('Overflow: '+language+' '+width);
        results.push(language+' '+width+'px: no overflow');
      }
      await page.setViewportSize({width:375,height:812});
      await page.locator('.nav-toggle').click();
      if (await page.locator('.nav-toggle').getAttribute('aria-expanded') !== 'true') throw new Error('Menu did not open');
      await page.keyboard.press('Escape');
      if (await page.locator('.nav-toggle').getAttribute('aria-expanded') !== 'false') throw new Error('Menu did not close');
      const opener = page.locator('[data-entry=agri]');
      await opener.focus();
      await page.keyboard.press('Enter');
      if (await page.locator('#portfolio-dialog[open]').count() !== 1) throw new Error('Keyboard did not open story');
      await page.locator('[data-group=certificateImages]').click();
      const picture = page.locator('.media-image').first();
      await picture.click();
      if (await page.locator('#lightbox[open]').count() !== 1) throw new Error('Image did not open');
      await page.keyboard.press('Escape');
      if (!await picture.evaluate(el => document.activeElement === el)) throw new Error('Image focus not restored');
      await page.keyboard.press('Escape');
      if (!await opener.evaluate(el => document.activeElement === el)) throw new Error('Story focus not restored');
      await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({path:'output/playwright/mobile-'+language+'.png'});
    }
    await page.locator('#language-toggle').click();
    await page.setViewportSize({width:1440,height:1000});
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(el => el.decode());
    }
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({path:'output/playwright/desktop.png',fullPage:true});
    await page.emulateMedia({reducedMotion:'reduce'});
    if (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior) !== 'auto') throw new Error('Reduced motion not respected');
    if(errors.length) throw new Error(errors.join('; '));
    return {results,projects:5,activities:7,keyboard:'passed in both languages',images:'all homepage images decoded',consoleErrors:errors};
  } finally {page.off('pageerror',onError);}
}
