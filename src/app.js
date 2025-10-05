import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import {fileURLToPath} from "url";
import http from "http";
import path from "path";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

app.set("socketio",io);

app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/", viewsRouter);


const productManager = new ProductManager(path.join(__dirname,"products.json"));

io.on("connection",(socket)=>{
  console.log("Cliente conectado");

  socket.on("testConexion", () => {
  console.log("¡WebSocket funcionando!");



});


  socket.on("nuevoProducto", async(data)=>{
    await productManager.addProduct(data);
    const products = await productManager.getProduct();
    io.emit("actualizarProductos",products);
  });

  socket.on("eliminarProducto", async(id)=>{
    await productManager.deleteProductById(id);
    const products= await productManager.getProduct();
    io.emit("actualizarProductos",products);
  });
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
