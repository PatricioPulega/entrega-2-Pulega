# 🛒 Pre-entrega 1 - Backend

Este repositorio contiene la **pre-entrega del proyecto backend** para e-commerce, desarrollado con Node.js y Express. La lógica está encapsulada en clases (`ProductManager` y `CartManager`), y la persistencia se realiza mediante archivos `.json`. Todos los endpoints fueron probados en Postman y cumplen con la consigna académica.

🔗 Repositorio: [https://github.com/PatricioPulega/Pre-entrega-1-Backend](https://github.com/PatricioPulega/Pre-entrega-1-Backend)

---

## 📁 Estructura del proyecto

├── app.js ├── productManager.js ├── cartManager.js ├── products.json ├── carts.json ├── package.json ├── package-lock.json ├── .gitignore

---

## 🚀 Cómo ejecutar el proyecto

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/PatricioPulega/Pre-entrega-1-Backend.git


- Instalá las dependencias:
npm install
- Ejecutá el servidor:
npm start
📌 El servidor se inicia en el puerto 8080.🔗 Endpoints disponibles🔹 Productos- GET /api/products
Devuelve todos los productos.
- POST /api/products
Crea un nuevo producto.
- PUT /api/products/:pid
Modifica un producto por ID.
- DELETE /api/products/:pid
Elimina un producto por ID.
🔹 Carritos- POST /api/carts
Crea un nuevo carrito.
- GET /api/carts/:cid
Devuelve los productos de un carrito.
- POST /api/carts/:cid/product/:pid
Agrega un producto al carrito con cantidad.
⚠️ Archivos excluidos del repositorioPor indicación de la consigna:- La carpeta node_modules/ está excluida mediante .gitignore.
- Si se solicita, también se puede excluir products.json y carts.json para evitar subir datos de prueba.
📎 AutorPatricio Pulega
Septiembre 2025