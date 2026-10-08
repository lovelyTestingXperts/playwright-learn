import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class LoginPage extends BasePage {
    usernameInput: any;
    passwordInput: any
    loginButton: any;
    errorMessage: any;
    constructor(page: Page) {
        super(page);

        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }


    async navigateToLoginPage() {
        await this.page.goto(''); // from where i should i get this url ? 
    }


    async login(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
}