import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { LoginTask } from '../../src/tasks/login.task';
import { LoginQuestion } from '../../src/questions/login.question';
import { Navigate } from '../../src/interactions/navigate.interaction';
import dotenv from 'dotenv';

dotenv.config();

Given('que estoy en la página de login', async function () {
  const page: Page = this.page;
  await Navigate.toLoginPage(page);
});

When('inicio sesión con credenciales válidas', async function () {
  const page: Page = this.page;
  await LoginTask.withCredentials(
    page,
    process.env.STANDARD_USER!,
    process.env.STANDARD_PASSWORD!
  );
});

When('intento iniciar sesión con el usuario bloqueado', async function () {
  const page: Page = this.page;
  await LoginTask.withCredentials(
    page,
    process.env.LOCKED_USER!,
    process.env.STANDARD_PASSWORD!
  );
});

Then('debería ver el inventario de productos', async function () {
  const page: Page = this.page;
  await LoginQuestion.isSuccessful(page);
});

Then('debería ver un mensaje de error', async function () {
  const page: Page = this.page;
  await LoginQuestion.showsError(page);
});

Then('el mensaje debe contener {string}', async function (expectedText: string) {
  const page: Page = this.page;
  await LoginQuestion.errorContainsText(page, expectedText);
});