import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { Click } from '../interactions/click.interaction';
import { Fill } from '../interactions/fill.interaction';

export class CheckoutTask {
    static async completePurchase(
        page: Page,
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        // Ir al carrito
        const inventoryPage = new InventoryPage(page);
        await Click.on(inventoryPage.shoppingCartLink);

        // Hacer el checkout
        const cartPage = new CartPage(page);
        await Click.on(cartPage.checkoutButton);

        // rellenar la info del checkout
        const checkoutPage = new CheckoutPage(page);
        await Fill.field(checkoutPage.firstNameInput, firstName);
        await Fill.field(checkoutPage.lastNameInput, lastName);
        await Fill.field(checkoutPage.postalCodeInput, postalCode);
        await Click.on(checkoutPage.continueButton);

        // Terminar la compra
        await Click.on(checkoutPage.finishButton);
    }
}