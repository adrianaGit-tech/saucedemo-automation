import { Locator } from '@playwright/test';

export class Fill {
    static async field(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.clear();
        await locator.fill(text);
    }
}