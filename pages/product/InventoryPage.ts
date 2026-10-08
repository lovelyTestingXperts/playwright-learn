import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class InventoryPage extends BasePage {
    // Locators
    readonly appLogo: Locator;
    readonly menuButton: Locator;
    readonly shoppingCartIcon: Locator;
    readonly inventoryList: Locator;
    readonly productNames: Locator;
    readonly productDescriptions: Locator;
    readonly productPrices: Locator;
    constructor(page: Page) {
        super(page);

        this.appLogo = page.locator('.app_logo');
        this.menuButton = page.locator('.bm-burger-button');
        this.shoppingCartIcon = page.locator('.shopping_cart_container');
        this.inventoryList = page.locator('.inventory_list');
        this.productNames = page.locator('.inventory_item_name');
        this.productDescriptions = page.locator('.inventory_item_desc');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async navigateToInventoryPage() {
        await this.page.goto('/inventory.html'); // from where i should i get this url ? 
    }

    async navigateToProductDetailsPage(productName: string) {
        await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
    }

    async getAppLogo() {
        return await this.appLogo.textContent();
    }

    async isMenuButtonVisible() {
        return await this.menuButton.isVisible();
    }

    async isShoppingCartVisible() {
        return await this.shoppingCartIcon.isVisible();
    }

    async isProductListVisible() {
        return await this.inventoryList.isVisible();
    }

    async getFirstProductName(): Promise<string | null> {
        return await this.productNames.first().textContent();
    }

    async getFirstProductDescription() {
        return await this.productDescriptions.first().textContent();
    }

    async getFirstProductPrice() {
        return await this.productPrices.first().textContent();
    }

    async openFirstProduct() {
        await this.productNames.first().click();
    }

    async getProductCount() {
        return await this.productNames.count();
    }

    async addFirstItemToCart() {
        const firstProductName = await this.getFirstProductName();
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: firstProductName });

        await product.locator('.btn_inventory').click();
    }


    async goToCartPage() {
        await this.shoppingCartIcon.click();
    }

}