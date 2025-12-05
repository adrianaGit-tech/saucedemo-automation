import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

export class LoginQuestion {
    static async isSuccessful(page: Page): Promise<void> {
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.inventoryContainer).toBeVisible({ timeout: 10000 });
    }

    static async showsError(page: Page): Promise<void> {
        const loginPage = new LoginPage(page);
        await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
    }

    static async errorContainsText(page: Page, expectedText: string): Promise<void> {
        const loginPage = new LoginPage(page);
        await expect(loginPage.errorMessage).toContainText(expectedText);
    }
}