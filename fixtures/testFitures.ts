
import { Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/auth/Loginpage";
import { test as base } from '@playwright/test';
type MyFixtures = {
    authenticatedPage: Page;
}


export const test = base.extend<MyFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(
            'standard_user', 'secret_sauce'
        );

        await use(page);
    }
});

export {expect }