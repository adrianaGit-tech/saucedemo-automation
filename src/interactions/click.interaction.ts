import { Locator } from '@playwright/test';

export class Click {
    static async on(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
    }
}