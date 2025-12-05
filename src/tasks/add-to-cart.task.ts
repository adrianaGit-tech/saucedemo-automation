import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { Click } from '../interactions/click.interaction';

export class AddToCartTask {
    static async product(page: Page, productName: string): Promise<void> {
        const inventoryPage = new InventoryPage(page);
        const addButton = inventoryPage.getAddToCartButton(productName);
        await Click.on(addButton);
    }
}