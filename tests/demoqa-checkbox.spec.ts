import { test } from "./setup-block-banners";
import { DemoQACheckboxPage } from "../pages/DemoQACheckboxPage";

test('Checkbox: should select Desktop and validate selection', async ({ page }) => {
    const checkboxPage = new DemoQACheckboxPage(page);
    await checkboxPage.blockBanners();
    await checkboxPage.goto();
    await checkboxPage.assertInitialCheckboxAndExpandIcon();
    await checkboxPage.expandHome();
    await checkboxPage.assertExpandedItems();
    await checkboxPage.checkDesktop();
    await checkboxPage.assertSelection();
});
