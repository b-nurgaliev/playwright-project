import { Page, expect } from "@playwright/test";

export class DemoQACheckboxPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async blockBanners() {
        await this.page.route('**/*', (route) => {
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
        await this.page.evaluate(() => {
            const bannerSelectors = [
                '#fixedban',
                '.Advertisement',
                'iframe[src*="ad"]',
            ];
            bannerSelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => el.remove());
            });
        });
    }

    async goto() {
        await this.page.goto('https://demoqa.com/checkbox/');
    }

    async assertInitialCheckboxAndExpandIcon() {
        // Unchecked checkbox icon
        await expect(this.page.locator('.rct-icon-uncheck')).toBeVisible();
        // Expand/close icon
        await expect(this.page.locator('.rct-icon-expand-close')).toBeVisible();
        // Home title
        await expect(this.page.locator('.rct-title', { hasText: 'Home' })).toBeVisible();
        // Banner should be gone
        // await expect(this.page.locator('#fixedban')).toHaveCount(0);
    }

    async expandHome() {
        await this.page.locator('.rct-icon-expand-close').click();
    }

    async assertExpandedItems() {
        await expect(this.page.locator('.rct-title', { hasText: 'Desktop' })).toBeVisible();
        await expect(this.page.locator('.rct-title', { hasText: 'Documents' })).toBeVisible();
        await expect(this.page.locator('.rct-title', { hasText: 'Downloads' })).toBeVisible();
    }

    async checkDesktop() {
        // Click the Desktop checkbox
        await this.page.locator('.rct-node .rct-title', { hasText: 'Desktop' }).locator('..').locator('.rct-checkbox').click();
    }

    async assertSelection() {
        await expect(this.page.locator('span', { hasText: 'You have selected :' })).toBeVisible();
        await expect(this.page.locator('span.text-success', { hasText: 'desktop' })).toBeVisible();
        await expect(this.page.locator('span.text-success', { hasText: 'notes' })).toBeVisible();
        await expect(this.page.locator('span.text-success', { hasText: 'commands' })).toBeVisible();
    }
}
