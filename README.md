# 🧪 SauceDemo Automation - E2E + API + CI/CD

Proyecto de automatización integral usando **Playwright**, **Cucumber BDD** y **Patrón Screenplay**.

## 📁 Estructura del Proyecto
```
saucedemo-automation/
├── .github/workflows/     # CI/CD con GitHub Actions
├── features/              # Escenarios BDD en Gherkin
│   └── step-definitions/  # Implementación de pasos
├── src/
│   ├── interactions/      # Acciones básicas (Click, Fill, Navigate)
│   ├── pages/             # Page Objects
│   ├── questions/         # Validaciones y assertions
│   ├── tasks/             # Tareas de alto nivel
│   └── utils/             # Utilidades
├── tests/
│   └── api/               # Pruebas de API
└── reports/               # Reportes generados (gitignored)
```

## 🏗️ Arquitectura

- **Patrón Screenplay**: Separación entre Actors, Tasks, Interactions y Questions
- **Cucumber BDD**: Escenarios en lenguaje natural (Gherkin)
- **TypeScript**: Type-safety y mejor mantenibilidad
- **CI/CD**: GitHub Actions con ejecución automática

## 🚀 Instalación
```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/saucedemo-automation.git
cd saucedemo-automation

# Instalar dependencias
npm install

# Instalar browsers de Playwright
npx playwright install chromium

# Configurar variables de entorno
cp .env.example .env
```

## ▶️ Ejecución Local
```bash
# Pruebas E2E (Cucumber)
npm run test:e2e

# Pruebas de API
npm run test:api

# Todas las pruebas
npm run test:all
```

## 📊 Reportes

Los reportes se generan automáticamente en:
- **Cucumber**: `reports/cucumber-report.html`
- **Playwright**: `reports/playwright-html/`

Para abrir el reporte de Playwright:
```bash
npx playwright show-report reports/playwright-html
```

## 🧪 Escenarios Cubiertos

### E2E Tests (Cucumber + Screenplay)
1. ✅ Login exitoso con credenciales válidas
2. ✅ Login fallido con usuario bloqueado
3. ✅ Flujo completo de compra de producto

### API Tests (Playwright)
1. ✅ Autenticación con 3 usuarios diferentes
2. ✅ Validación de contratos (schema validation)
3. ✅ Flujo completo: Listar usuarios → Login → Obtener usuario actual

## 🛠️ Tecnologías

- [Playwright](https://playwright.dev/) - Framework de automatización
- [Cucumber](https://cucumber.io/) - BDD framework
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje tipado
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📝 Variables de Entorno

Crea un archivo `.env` en la raíz con:
```bash
# SauceDemo
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user

# DummyJSON API
API_BASE_URL=https://dummyjson.com
API_USER_1=emilys
API_PASSWORD_1=emilyspass
API_USER_2=michaelw
API_PASSWORD_2=michaelwpass
API_USER_3=sophiab
API_PASSWORD_3=sophiabpass
```
