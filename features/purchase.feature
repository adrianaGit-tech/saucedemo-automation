# language: es
Característica: Flujo de compra completo
  Como cliente de SauceDemo
  Quiero poder comprar productos
  Para completar mi orden

  Escenario: Compra exitosa de un producto
    Dado que estoy logueado como usuario estándar
    Cuando agrego "Sauce Labs Backpack" al carrito
    Y completo el proceso de checkout con mis datos
    Entonces debería ver la confirmación de compra
