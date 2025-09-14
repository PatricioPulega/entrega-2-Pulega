# 🛒 Pre-entrega 1 - Backend

Este repositorio contiene la **pre-entrega del proyecto backend** para e-commerce, desarrollado con Node.js y Express. La lógica está encapsulada en clases, y la persistencia se realiza mediante archivos `.json`. Todos los endpoints fueron probados en Postman y cumplen con la consigna académica.

🔗 Repositorio: [https://github.com/PatricioPulega/Pre-entrega-1-Backend](https://github.com/PatricioPulega/Pre-entrega-1-Backend)

---

## 📁 Estructura del proyecto

📁 src/ ├── app.js ├── ProductManager.js ├── CartManager.js 📄 products.json 📄 carts.json 📄 .gitignor

---

## 🚀 Cómo ejecutar el proyecto

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/PatricioPulega/Pre-entrega-1-Backend.git
   ```
2. Instalá las dependencias:
   npm install
3. Ejecutá el servidor:
   node src/app.js

- El servidor se inicia en el puerto 8080.

📌 Endpoints disponibles
🔹 Productos

- GET /api/products
  Devuelve todos los productos.
- POST /api/products
  Crea un nuevo producto.
  Body ejemplo:
  {
  "title": "Teclado mecánico",
  "description": "Teclado RGB con switches azules",
  "price": 8500,
  "stock": 10,
  "category": "periféricos"
  }
- PUT /api/products/:pid
  Modifica un producto por ID.
- DELETE /api/products/:pid
  Elimina un producto por ID.

🔹 Carritos

- POST /api/carts
  Crea un nuevo carrito.
- GET /api/carts/:cid
  Devuelve los productos de un carrito.
- POST /api/carts/:cid/product/:pid
  Agrega un producto al carrito.
  Body ejemplo:
  {
  "quantity": 3
  }

📄 Ejemplo de datos persistidos
products.json
[
{
"id": "2625f4d4-58df-4aef-b8aa-8ab3c29125c6",
"title": "Teclado mecánico",
"description": "Teclado RGB con switches azules",
"price": 8500,
"stock": 10,
"category": "periféricos"
}
]

carts.json
[
{
"id": "8dcf8baf-09ef-4d22-bd10-2ccff986b5c0",
"products": [
{
"product": "2625f4d4-58df-4aef-b8aa-8ab3c29125c6",
"quantity": 3
}
]
}
]

⚠️ Archivos excluidos del repositorio
Por indicación de la consigna

- La carpeta node_modules/ está excluida mediante .gitignore.
- Si se solicita, también se puede excluir products.json y carts.json para evitar subir datos de prueba.

📎 Autor
Patricio Pulega
Septiembre 2025
