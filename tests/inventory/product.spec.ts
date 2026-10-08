import { APPLICATION_ENVRIONMENT } from '../../config/env.config';
import { test, expect } from '../../fixtures/testFitures';
import { InventoryPage } from '../../pages/product/InventoryPage';

test.describe('Product page tests (inventory)', () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ authenticatedPage }) => {
        inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.navigateToInventoryPage();
    });

    test('Navigate to inventory page', async () => {
        expect(inventoryPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/inventory.html');

        expect(await inventoryPage.getAppLogo())
            .toBe('Swag Labs');

        expect(await inventoryPage.isMenuButtonVisible())
            .toBe(true);

        expect(await inventoryPage.isShoppingCartVisible())
            .toBe(true);
    });

    test('Verify product list is displayed', async () => {
        expect(await inventoryPage.isProductListVisible())
            .toBe(true);

        expect(await inventoryPage.getFirstProductName())
            .not.toBeNull();

        expect(await inventoryPage.getFirstProductDescription())
            .not.toBeNull();

        expect(await inventoryPage.getFirstProductPrice())
            .not.toBeNull();
    });

    test('Verify navigation to first product in list', async () => {
        const firstProductName =
            await inventoryPage.getFirstProductName();

        await inventoryPage.openFirstProduct();

        const productDetailName =
            await inventoryPage.page
                .locator('.inventory_details_name')
                .textContent();

        expect(productDetailName)
            .toBe(firstProductName);
    });
});