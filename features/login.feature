# language: es
Característica: Autenticación en SauceDemo
  Como usuario de SauceDemo
  Quiero poder iniciar sesión
  Para acceder a la tienda

  Escenario: Login exitoso con credenciales válidas
    Dado que estoy en la página de login
    Cuando inicio sesión con credenciales válidas
    Entonces debería ver el inventario de productos

  Escenario: Login fallido con usuario bloqueado
    Dado que estoy en la página de login
    Cuando intento iniciar sesión con el usuario bloqueado
    Entonces debería ver un mensaje de error
    Y el mensaje debe contener "Sorry, this user has been locked out"
