import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';

test.describe('API Authentication Tests', () => {
  const users = [
    { username: process.env.API_USER_1!, password: process.env.API_PASSWORD_1!, name: 'Emily Johnson' },
    { username: process.env.API_USER_2!, password: process.env.API_PASSWORD_2!, name: 'Michael Williams' },
    { username: process.env.API_USER_3!, password: process.env.API_PASSWORD_3!, name: 'Sophia Brown' }
  ];

  for (const user of users) {
    test(`should login successfully with user: ${user.username}`, async ({ request }) => {
      const response = await request.post(`${API_BASE_URL}/auth/login`, {
        data: {
          username: user.username,
          password: user.password,
          expiresInMins: 30
        }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      
      expect(body).toHaveProperty('accessToken');
      expect(body).toHaveProperty('refreshToken');
      expect(body.accessToken).toBeTruthy();
      expect(body.accessToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
      
      // Validar datos del usuario
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('username');
      expect(body.username).toBe(user.username);
      expect(body).toHaveProperty('email');
      expect(body).toHaveProperty('firstName');
      expect(body).toHaveProperty('lastName');
    });
  }
});