import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';

test.describe('API Contract Tests', () => {
  test('POST /auth/login - should return valid contract', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: process.env.API_USER_1!,
        password: process.env.API_PASSWORD_1!
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    //Validar estructura del contrato
    expect(body).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      gender: expect.any(String),
      image: expect.any(String),
      accessToken: expect.any(String),      
      refreshToken: expect.any(String)      
    });

    // Validar formato del email
    expect(body.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    // Validar que gender sea male o female
    expect(['male', 'female']).toContain(body.gender);
  });

  test('GET /users - should return valid users array contract', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users?limit=5`);
    
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validar estructura de paginación
    expect(body).toMatchObject({
      users: expect.any(Array),
      total: expect.any(Number),
      skip: expect.any(Number),
      limit: expect.any(Number)
    });

    // Validar que hay usuarios
    expect(body.users.length).toBeGreaterThan(0);

    // Validar estructura de cada usuario
    const user = body.users[0];
    expect(user).toMatchObject({
      id: expect.any(Number),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      age: expect.any(Number),
      gender: expect.stringMatching(/^(male|female)$/),
    });
  });
});