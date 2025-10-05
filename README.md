# 📦 Backend E-commerce | Entrega 2

Proyecto académico para el curso de Backend, que integra persistencia con archivos, motor de plantillas Handlebars, y comunicación en tiempo real con WebSocket. Validado contra consigna y estructurado profesionalmente.

## 📁 Estructura del proyecto


src/ ├── routes/ │   ├── products.router.js │   ├── carts.router.js │   └── views.router.js ├── views/ │   ├── layouts/ │   │   └── main.handlebars │   ├── home.handlebars │   └── realTimeProducts.handlebars ├── public/ │   └── js/ │       └── realtime.js ├── managers/ │   ├── ProductManager.js │   └── CartManager.js ├── utils/ │   └── validations.js ├── data/ │   ├── products.json │   └── carts.json └── app.js

## 🚀 Tecnologías utilizadas

- Node.js + Express
- Handlebars (motor de plantillas)
- WebSocket (Socket.io)
- Persistencia con archivos JSON
- Modularización con routers
- Validaciones y manejo de errores

## 🧩 Funcionalidades

### Productos
- Listado de productos desde archivo JSON
- Agregado, edición y eliminación vía endpoints REST
- Renderizado dinámico con Handlebars
- Actualización en tiempo real con WebSocket

### Carrito
- Creación de carrito
- Agregado de productos por ID
- Persistencia en archivo `carts.json`

### Vistas
- `/home`: muestra productos con Handlebars
- `/realtimeproducts`: permite agregar productos y ver actualizaciones en tiempo real

## 📡 WebSocket

- Conexión establecida desde `realtime.js`
- Emisión de eventos al agregar productos
- Actualización automática del listado en la vista

## 📌 Validaciones

- Validación de campos obligatorios
- Manejo de errores con mensajes claros
- Separación de lógica en `utils/validations.js`

## 📚 Consigna validada

- ✅ Persistencia con archivos
- ✅ Motor de plantillas Handlebars
- ✅ WebSocket para productos en tiempo real
- ✅ Estructura modular con routers
- ✅ Documentación clara y profesional

## 🛠️ Scripts

```bash
npm run dev


Usa nodemon para desarrollo en caliente.
🧪 Test manual
- Se validó cada endpoint con Postman
- Se probó la vista en navegador
- Se verificó persistencia en archivos
🏛️ Autor
Patricio Pulega Octubre 2025
