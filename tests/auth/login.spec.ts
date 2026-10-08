import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/Loginpage';
import { INVALID_USER, VALID_USER } from '../../test-data/users';

/**
 * pending todos
 *   - Dynamically import user creds from data file instead of hard coding
 * 
 * */

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    // TODO : LEARN ABOUT THIS
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('login with valid credentials', async ({ page }) => {
        const { email, password } = VALID_USER
        await loginPage.login(email, password);
        // Verify page URL
        await expect(page).toHaveURL('/inventory.html');
        //  Verify page title
        await expect(page).toHaveTitle('Swag Labs');
        //  Verify header
        // await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
        //  Verify menu button
        await expect(page.locator('.bm-burger-button')).toBeVisible();
        //  Verify shopping cart icon
        await expect(page.locator('.shopping_cart_container')).toBeVisible();
    })

    test('login with invalid credentials', async ({ }) => {
        const { email, password } = INVALID_USER
        await loginPage.login(email, password);
        await expect(loginPage.errorMessage).toBeVisible();
    })
    test('login with empty credentials', async ({ }) => {
        const { email, password } = VALID_USER
        await loginPage.login(email, '');
        await expect(loginPage.errorMessage).toBeVisible();
    })
    test('Password field masks entered characters', async ({ }) => {
        await loginPage.passwordInput.fill('secret_sauce');
        const passwordFieldType = await loginPage.passwordInput.getAttribute('type');
        await expect(passwordFieldType).toBe('password');
    })

})