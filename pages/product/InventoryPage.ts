import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class InventoryPage extends BasePage {

    constructor(page: Page) {
        super(page);

    }

    async navigateTInventoryPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html'); // from where i should i get this url ? 
    }

    async navigateToProductDetailsPage(productName: string) {
        await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
    }
}