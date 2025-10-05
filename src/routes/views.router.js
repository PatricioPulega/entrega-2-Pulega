import { Router } from "express";
import ProductManager from "../productManager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const productManager = new ProductManager(path.join(__dirname, "../products.json"));

router.get("/", async (req, res) => {
  const products = await productManager.getProduct();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProduct();
  res.render("realTimeProducts", { products });
});

export default router;
