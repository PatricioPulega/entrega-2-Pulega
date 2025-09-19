import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";

const app = express();
app.use(express.json());
const productManager = new ProductManager("./products.json");
const cartManager = new CartManager("./carts.json");

app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProduct();
    res.status(200).json({ message: "Lista de productos", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto añadido", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;
    const updated = await productManager.setProductById(pid, updates);
    res.status(200).json({ message: "Producto modificado", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto Eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/carts", async (req, res) => {
  try {
    const cart = await cartManager.addCart();
    res.status(201).json({ message: "Nuevo carrito creado", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/carts/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    res
      .status(200)
      .json({ message: "Productos agregados en el carrito", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductInCart(cid, pid, quantity);
    res.json({ message: "Producto agregado correctamente", updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
