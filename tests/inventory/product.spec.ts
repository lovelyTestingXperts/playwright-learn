import { test, expect } from '../../fixtures/testFitures';
import { LoginPage } from '../../pages/auth/Loginpage';
import { InventoryPage } from '../../pages/product/InventoryPage';

/**
 * pending todos
 *   - Dynamically import user creds from data file instead of hard coding
 * 
 * */

test.describe('Product page tests (inventory)', () => {
    let inventoryPage: InventoryPage;


    test.beforeEach(async ({ authenticatedPage }) => {
        inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.navigateTInventoryPage();
    })

    test('Navigate to inventory page', async ({ authenticatedPage }) => {
        inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.navigateTInventoryPage();
        expect(authenticatedPage.url()).toBe('https://www.saucedemo.com/inventory.html');
        const heading = await authenticatedPage.locator('.app_logo').textContent();
        expect(heading).toBe('Swag Labs');
        const menuButton = await authenticatedPage.locator('.bm-burger-button').isVisible();
        expect(menuButton).toBe(true);
        const shoppingCartIcon = await authenticatedPage.locator('.shopping_cart_container').isVisible();
        expect(shoppingCartIcon).toBe(true);
    })

    test('Verify product list is displayed', async ({ authenticatedPage }) => {
        const productList = await authenticatedPage.locator('.inventory_list').isVisible();
        expect(productList).toBe(true);
        // check first occurance in list have name, description and price
        const firstProductName = await authenticatedPage.locator('.inventory_item_name').first().textContent();
        expect(firstProductName).not.toBeNull();
        const firstProductDescription = await authenticatedPage.locator('.inventory_item_desc').first().textContent();
        expect(firstProductDescription).not.toBeNull();
        const firstProductPrice = await authenticatedPage.locator('.inventory_item_price').first().textContent();
        expect(firstProductPrice).not.toBeNull();
    })

    test('verify navigation to first production in list', async ({ authenticatedPage }) => {
        const firstProductName = await authenticatedPage.locator('.inventory_item_name').first().textContent();
        await authenticatedPage.locator('.inventory_item_name').first().click();
        const productDetailName = await authenticatedPage.locator('.inventory_details_name').textContent();
        expect(productDetailName).toBe(firstProductName);
    })

})