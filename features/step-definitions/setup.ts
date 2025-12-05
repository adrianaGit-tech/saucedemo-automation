import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';

setDefaultTimeout(60000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ 
    headless: process.env.CI === 'true',
    slowMo: 100 
  });
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: 'reports/videos' }
  });
  page = await context.newPage();
  
  // Adjuntar page al contexto de Cucumber
  this.page = page;
  this.context = context;
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
  if (browser) {
    await browser.close();
  }
});

export { page, context, browser };