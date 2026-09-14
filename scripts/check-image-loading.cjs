const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  require('node:fs').mkdirSync('.preview', { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport });
      const requests = [];
      const errors = [];
      page.on('request', request => { if (request.resourceType() === 'image') requests.push(request.url()); });
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:4175/Portfolio/');
      await page.locator('.portrait-image').evaluate(img => img.decode());
      await page.locator('.carousel-card img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await page.waitForTimeout(500);
      assert.equal(requests.filter(url => /\/assets\/.*\.(png|jpe?g)/.test(url)).length, 0, 'Original carousel images must not load on entry');
      assert.equal(requests.filter(url => /\/assets\/\d+-\d+\.webp/.test(url)).length, 0, 'Projects must not load above the fold');
      const initialRequests = requests.length;
      await page.screenshot({ path: `.preview/images-${viewport.width}-hero.png` });
      await page.locator('.dual-carousel').scrollIntoViewIfNeeded();
      await page.addStyleTag({ content: '.carousel-track { animation-play-state: paused !important; }' });
      const first = page.locator('.carousel-row').first().locator('.carousel-card').first();
      await first.scrollIntoViewIfNeeded();
      await first.locator('img').evaluate(img => img.decode());
      await page.waitForFunction(() => [...document.querySelectorAll('.carousel-card img')].filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
      }).every(img => img.complete && img.naturalWidth > 0));
      await page.screenshot({ path: `.preview/images-${viewport.width}-carousel.png` });
      await first.click();
      await page.locator('dialog[open] > img').evaluate(img => img.decode());
      assert(requests.some(url => /\/assets\/.*\.(png|jpe?g)/.test(url)), 'Opening the preview must request the original');
      await page.getByRole('button', { name: '关闭原图预览' }).click();
      for (const project of await page.locator('.stack-card').all()) {
        await project.scrollIntoViewIfNeeded();
        const images = project.locator('.art-column img');
        for (const img of await images.all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(img => img.decode());
        }
      }
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ viewport, initialImageRequests: initialRequests, projectsDecoded: await page.locator('.art-column img').count(), result: 'passed' }));
      await page.close();
    }
    const page = await browser.newPage();
    let attempts = 0;
    await page.route('**/thumbnails/portrait.webp*', async route => {
      attempts++;
      if (attempts < 3) await route.abort('failed');
      else await route.continue();
    });
    await page.goto('http://127.0.0.1:4175/Portfolio/');
    await page.waitForFunction(() => document.querySelector('.portrait-image')?.naturalWidth > 0);
    assert.equal(attempts, 3);
    await page.close();
    const failedPage = await browser.newPage();
    let failures = 0;
    await failedPage.route('**/thumbnails/portrait.webp*', route => { failures++; return route.abort('failed'); });
    await failedPage.goto('http://127.0.0.1:4175/Portfolio/');
    await failedPage.waitForTimeout(5000);
    assert.equal(failures, 3, 'Retries must stop after two automatic attempts');
    await failedPage.unroute('**/thumbnails/portrait.webp*');
    await failedPage.evaluate(() => window.dispatchEvent(new Event('online')));
    await failedPage.waitForFunction(() => document.querySelector('.portrait-image')?.naturalWidth > 0);
    console.log('Retry recovery, retry limit, and online recovery: passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
