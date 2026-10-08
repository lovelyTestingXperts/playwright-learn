import { APPLICATION_ENVRIONMENT } from '../../config/env.config';
import { test, expect } from '../../fixtures/testFitures';
import { CartPage } from '../../pages/product/CartPage';
import { InventoryPage } from '../../pages/product/InventoryPage';

test.describe('Cart page tests', () => {

    let cartPage: CartPage;
    let inventoryPage: InventoryPage;
    test.beforeEach(async ({ authenticatedPage }) => {
        cartPage = new CartPage(authenticatedPage);
        inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.navigateToInventoryPage();
    });

    test('Full checkout process', async () => {
        await inventoryPage.addFirstItemToCart();
        await inventoryPage.goToCartPage();
        expect(cartPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/cart.html');
        expect(await cartPage.secondaryHeader.textContent())
            .toBe('Your Cart');
        expect(await cartPage.cartItems.count())
            .toBe(1);
        expect(await cartPage.cartItemNames.first().textContent())
            .toBe(await inventoryPage.getFirstProductName());
        await cartPage.clickOnCheckoutButton();
        expect(cartPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/checkout-step-one.html');

        await cartPage.enterCheckoutInformation('John', 'Doe', '12345');
        await cartPage.clickOnContinueButton();
        expect(cartPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/checkout-step-two.html');
        await cartPage.clickOnfinishButton();
        expect(cartPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/checkout-complete.html');
        expect(await cartPage.secondaryHeader.textContent())
            .toBe('Checkout: Complete!');

    });

    test('Remove item from cart', async () => {
        await inventoryPage.addFirstItemToCart();
        await inventoryPage.goToCartPage();
        expect(await cartPage.cartItems.count())
            .toBe(1);
        await cartPage.removeItemFromCart(await inventoryPage.getFirstProductName() || '');
        expect(await cartPage.cartItems.count())
            .toBe(0);
    });

    test('Clear all items from cart', async () => {
        await inventoryPage.addFirstItemToCart();
        await inventoryPage.addFirstItemToCart();
        await inventoryPage.goToCartPage();
        expect(await cartPage.cartItems.count())
            .toBe(2);
        await cartPage.clearAllCartItems();
        expect(await cartPage.cartItems.count())
            .toBe(0);
    });

    test('empty cart should not work on checkout', async () => {
        await inventoryPage.goToCartPage();
        expect(await cartPage.cartItems.count())
            .toBe(0);
        await cartPage.clickOnCheckoutButton();
        expect(cartPage.page.url())
            .toBe(APPLICATION_ENVRIONMENT.BASE_URL + '/checkout-step-one.html');

        await cartPage.enterCheckoutInformation('John', 'Doe', '12345');
        await cartPage.clickOnfinishButton();
        const isError = await cartPage.checkErrorMessageIsVisible();
        expect(isError)
            .toBe(true);
    })


})