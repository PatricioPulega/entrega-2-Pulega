import { Router } from "express";
import ProductManager from "../productManager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const productManager = new ProductManager(path.join(__dirname, "../products.json"));

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProduct();
    res.status(200).json({ message: "Lista de productos", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const products = await productManager.getProduct();
    const product = products.find((p) => p.id === pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto encontrado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto añadido", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;
    const updated = await productManager.setProductById(pid, updates);
    res.status(200).json({ message: "Producto modificado", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
