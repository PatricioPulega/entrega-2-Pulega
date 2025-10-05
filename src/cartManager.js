import fs from "fs/promises";
import crypto from "crypto";

class CartManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  generateNewId() {
    return crypto.randomUUID();
  }

  async addCart() {
    try {
      const cartJson = await fs.readFile(this.pathFile, "utf-8");
      const carts = JSON.parse(cartJson);

      const newId = this.generateNewId();
      const newCart = { id: newId, products: [] };

      carts.push(newCart);
      await fs.writeFile(
        this.pathFile,
        JSON.stringify(carts, null, 2),
        "utf-8"
      );
      return newCart;
    } catch (error) {
      throw new Error("Error al crear el carrito: " + error.message);
    }
  }
  async addProductInCart(cid, pid, quantity) {
    const cartJson = await fs.readFile(this.pathFile, "utf-8");
    const carts = JSON.parse(cartJson);

    const cartIndex = carts.findIndex((cart) => cart.id === cid);
    if (cartIndex === -1) throw new Error("Carrito no encontrado");

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((p) => p.product === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
    return cart;
  }
  async getProductsInCartById(cid) {
    const cartJson = await fs.readFile(this.pathFile, "utf-8");
    const carts = JSON.parse(cartJson);

    const cart = carts.find((c) => c.id === cid);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart.products;
  }
}
export default CartManager;
