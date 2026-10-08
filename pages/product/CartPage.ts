import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
    readonly checkOutButton: Locator;
    readonly cartItems: Locator;
    readonly cartItemNames: Locator;
    readonly contniueShoppingButton: Locator;
    readonly checkoutStepOneURL: string;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator;
    readonly checkoutStepOneContinueButton: Locator;
    readonly errorMessage: Locator;
    readonly checkoutStepTwoURL: string;
    readonly checkoutStepTwoFinishButton: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly itemTotal: Locator;
    readonly secondaryHeader: Locator;
    constructor(page: Page) {
        super(page);

        this.checkOutButton = this.page.locator('.checkout_button');
        this.cartItems = this.page.locator('.cart_item');
        this.cartItemNames = this.page.locator('.inventory_item_name');
        this.contniueShoppingButton = this.page.locator('.continue_shopping_button');
        this.checkoutStepOneURL = '/checkout-step-one.html';
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.zipCodeInput = this.page.locator('[data-test="postalCode"]');
        this.checkoutStepOneContinueButton = this.page.locator('[data-test="continue"]');
        this.errorMessage = this.page.locator('.error-message');
        this.checkoutStepTwoURL = '/checkout-step-two.html';
        this.checkoutStepTwoFinishButton = this.page.locator('[data-test="finish"]');
        this.paymentInfo = this.page.locator('.summary_value_label').first();
        this.shippingInfo = this.page.locator('.summary_value_label').nth(1);
        this.itemTotal = this.page.locator('.summary_subtotal_label');
        this.secondaryHeader = this.page.locator('[data-test="secondary-header"]');
    }

    async navigateTToCartPage() {
        await this.page.goto('/cart.html');
    }

    async clickOnCheckoutButton() {
        await this.page.locator('.checkout_button').click();
    }

    async enterCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async removeItemFromCart(itemName: string) {
        const product = this.page
            .locator('.cart_item')
            .filter({ hasText: itemName });
        await product.locator('.cart_button').click();
    }

    async clearAllCartItems() {
        await this.cartItemNames.allTextContents().then(async (itemNames: string[]) => {
            for (const itemName of itemNames) {
                await this.page.locator(`.cart_item_name:has-text("${itemName}")`).locator('..').locator('.btn_inventory').click();
            }
        });
    }

    async clickOnfinishButton() {
        await this.checkoutStepTwoFinishButton.click();
    }

    async clickOnContinueButton() {
        await this.checkoutStepOneContinueButton.click();
    }

    async checkErrorMessageIsVisible() {
        return await this.errorMessage.isVisible();
    }

}