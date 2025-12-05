import { Page, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';

export class CheckoutQuestion {
    static async isComplete(page: Page): Promise<void> {
        const checkoutPage = new CheckoutPage(page);
        await expect(checkoutPage.completeHeader).toBeVisible({ timeout: 10000 });
        await expect(checkoutPage.completeHeader).toContainText('Thank you for your order');
    }
}