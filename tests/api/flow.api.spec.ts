import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';

test.describe('API Flow Tests', () => {
  let authToken: string;
  let userId: number;

  test('Flow: List Users -> Login -> Get Current User', async ({ request }) => {
    
    console.log('PASO 1: Listando usuarios...');
    const usersResponse = await request.get(`${API_BASE_URL}/users?limit=5`);
    expect(usersResponse.status()).toBe(200);
    
    const usersBody = await usersResponse.json();
    expect(usersBody.users).toBeInstanceOf(Array);
    expect(usersBody.users.length).toBeGreaterThan(0);
    console.log(`✓ Encontrados ${usersBody.users.length} usuarios`);

    console.log('PASO 2: Iniciando sesión...');
    const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        username: process.env.API_USER_1!,
        password: process.env.API_PASSWORD_1!,
        expiresInMins: 30
      }
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    authToken = loginBody.accessToken;  
    userId = loginBody.id;

    expect(authToken).toBeTruthy();
    expect(userId).toBeGreaterThan(0);
    console.log(`✓ Login exitoso. User ID: ${userId}`);

    
    console.log('PASO 3: Obteniendo datos del usuario actual...');
    const currentUserResponse = await request.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(currentUserResponse.status()).toBe(200);

    const currentUserBody = await currentUserResponse.json();
    
    // Verificar que el usuario obtenido corresponde al logueado
    expect(currentUserBody.id).toBe(userId);
    expect(currentUserBody.username).toBe(process.env.API_USER_1);
    console.log(`✓ Usuario verificado: ${currentUserBody.firstName} ${currentUserBody.lastName}`);
  });

  test('Flow: Login multiple users and validate tokens', async ({ request }) => {
    const users = [
      { username: process.env.API_USER_1!, password: process.env.API_PASSWORD_1! },
      { username: process.env.API_USER_2!, password: process.env.API_PASSWORD_2! },
      { username: process.env.API_USER_3!, password: process.env.API_PASSWORD_3! }
    ];

    for (const user of users) {
      console.log(`\nValidando usuario: ${user.username}`);
      
      // Login
      const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
        data: user
      });

      expect(loginResponse.status()).toBe(200);

      const body = await loginResponse.json();
      expect(body.accessToken).toBeTruthy();  

      // Verificar que cada token es válido
      const meResponse = await request.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${body.accessToken}`  
        }
      });

      expect(meResponse.status()).toBe(200);
      const meBody = await meResponse.json();
      expect(meBody.username).toBe(user.username);
      console.log(`✓ Token validado para ${meBody.firstName} ${meBody.lastName}`);
    }
  });
});