import { test } from "./setup-block-banners";
import { expect } from "@playwright/test";
import { DemoQATextBoxPage } from "../pages/DemoQATextBoxPage";

test('TextBox: should submit form and validate output', async ({ page }) => {
    const textBoxPage = new DemoQATextBoxPage(page);
    await textBoxPage.blockBanners();
    await textBoxPage.goto();
    await textBoxPage.assertPageLoaded();
    await textBoxPage.assertLabels();
    await textBoxPage.fillForm({
        name: 'Max Mustermann',
        email: 'max-mustermann@email.com',
        currentAddress: 'Fontenay 13, 20354 Hamburg',
        permanentAddress: 'Fontenay 13, 20354 Hamburg',
    });
    await textBoxPage.submit();
    // Expect output elements to have submitted values (use paragraph selectors)
    await expect(page.locator('p#name')).toHaveText('Name:Max Mustermann');
    await expect(page.locator('p#email')).toHaveText('Email:max-mustermann@email.com');
    await expect(page.locator('p#currentAddress')).toHaveText('Current Address :Fontenay 13, 20354 Hamburg');
    await expect(page.locator('p#permanentAddress')).toHaveText('Permananet Address :Fontenay 13, 20354 Hamburg');
});
