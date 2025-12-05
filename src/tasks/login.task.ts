import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Navigate } from '../interactions/navigate.interaction';
import { Fill } from '../interactions/fill.interaction';
import { Click } from '../interactions/click.interaction';

export class LoginTask {
    static async withCredentials(
        page: Page,
        username: string,
        password: string
    ): Promise<void> {
        const loginPage = new LoginPage(page);

        await Navigate.toLoginPage(page);
        await Fill.field(loginPage.usernameInput, username);
        await Fill.field(loginPage.passwordInput, password);
        await Click.on(loginPage.loginButton);
    }
}