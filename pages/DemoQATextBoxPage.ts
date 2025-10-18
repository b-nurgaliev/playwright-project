import { Page, expect } from "@playwright/test";

export class DemoQATextBoxPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box');
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

    async assertPageLoaded() {
    await expect(this.page.locator('#userForm')).toBeVisible();
    }

    async assertLabels() {
        await expect(this.page.locator('#userName-label')).toHaveText('Full Name');
        await expect(this.page.locator('#userEmail-wrapper')).toContainText('Email');
        await expect(this.page.locator('#currentAddress-wrapper')).toContainText('Current Address');
        await expect(this.page.locator('#permanentAddress-wrapper')).toContainText('Permanent Address');
        await expect(this.page.locator('#submit')).toHaveText('Submit');
    }

    async fillForm({ name, email, currentAddress, permanentAddress }: { name: string, email: string, currentAddress: string, permanentAddress: string }) {
        await this.page.locator('#userName').fill(name);
        await this.page.locator('#userEmail').fill(email);
        await this.page.locator('#currentAddress').fill(currentAddress);
        await this.page.locator('#permanentAddress').fill(permanentAddress);
    }

    async submit() {
        await this.page.locator('#submit').click();
    }
}
