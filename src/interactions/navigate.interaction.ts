import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class Navigate {
  static async toLoginPage(page: Page): Promise<void> {
    const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
    console.log('Navigating to:', baseUrl); // Para debug
    await page.goto(baseUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  }
}