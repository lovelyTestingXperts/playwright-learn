import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/Loginpage';

// test('login', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.getByLabel('Username').fill('standard_user');
//     await page.getByLabel('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();
//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
// });

test.describe('Login Tests', () => {
  
    // TODO : LEARN ABOUT THIS
    // test.beforeEach(async ({ page }) => {
    //     await page.goto('https://www.saucedemo.com/');
    // }

    test('login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login('invalid_user', 'invalid_password');
        await expect(loginPage.errorMessage).toBeVisible();
    })
})