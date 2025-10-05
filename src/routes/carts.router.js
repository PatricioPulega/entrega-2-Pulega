import { Router } from "express";
import CartManager from "../cartManager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const cartManager = new CartManager(path.join(__dirname, "../carts.json"));

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.addCart();
    res.status(201).json({ message: "Nuevo carrito creado", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ message: "Productos agregados en el carrito", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
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

export default router;
