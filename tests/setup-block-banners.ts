import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (
        url.includes('googleads') ||
        url.includes('adservice') ||
        url.includes('adsystem') ||
        url.includes('doubleclick') ||
        url.includes('googlesyndication')
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await page.evaluate(() => {
      const bannerSelectors = [
        '#fixedban',
        '.Advertisement',
        'iframe[src*="ad"]',
      ];
      bannerSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });
    });
    await use(page);
  },
});
