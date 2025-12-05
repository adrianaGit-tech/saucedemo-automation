import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    getProductByName(productName: string): Locator {
        return this.page.locator(`.inventory_item:has-text("${productName}")`);
    }

    getAddToCartButton(productName: string): Locator {
        return this.getProductByName(productName)
            .locator('[data-test^="add-to-cart"]');
    }
}