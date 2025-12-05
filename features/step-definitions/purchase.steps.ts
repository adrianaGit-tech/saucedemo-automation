import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { LoginTask } from '../../src/tasks/login.task';
import { AddToCartTask } from '../../src/tasks/add-to-cart.task';
import { CheckoutTask } from '../../src/tasks/checkout.task';
import { CheckoutQuestion } from '../../src/questions/checkout.question';
import dotenv from 'dotenv';

dotenv.config();

Given('que estoy logueado como usuario estándar', async function () {
  const page: Page = this.page;
  await LoginTask.withCredentials(
    page,
    process.env.STANDARD_USER!,
    process.env.STANDARD_PASSWORD!
  );
});

When('agrego {string} al carrito', async function (productName: string) {
  const page: Page = this.page;
  await AddToCartTask.product(page, productName);
});

When('completo el proceso de checkout con mis datos', async function () {
  const page: Page = this.page;
  await CheckoutTask.completePurchase(
    page,
    'John',
    'Doe',
    '12345'
  );
});

Then('debería ver la confirmación de compra', async function () {
  const page: Page = this.page;
  await CheckoutQuestion.isComplete(page);
});