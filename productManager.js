import crypto from "crypto";
import fs from "fs/promises";

class ProductManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
  }
  generateNewId() {
    return crypto.randomUUID();
  }
  async addProduct(newProduct) {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const newId = this.generateNewId();

      const product = { id: newId, ...newProduct };
      products.push(product);

      await fs.writeFile(
        this.pathFile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      throw new Error("Error al añadir el nuevo producto: " + error.message);
    }
  }
  async getProduct() {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      throw new Error("Error al mostrar todos los productos: " + error.message);
    }
  }
  async setProductById(productId, updates) {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const indexProduct = products.findIndex(
        (product) => product.id === productId
      );
      if (indexProduct === -1) throw new Error("Producto no encontrado");

      products[indexProduct] = {
        ...products[indexProduct],
        ...updates,
        id: products[indexProduct].id,
      };

      await fs.writeFile(
        this.pathFile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      throw new Error("Error al actualizar el producto: " + error.message);
    }
  }
  async deleteProductById(productId) {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const filteredProduct = products.filter(
        (product) => product.id !== productId
      );
      if (products.length === filteredProduct.length) {
        throw new Error("Producto no encontrado");
      }
      await fs.writeFile(
        this.pathFile,
        JSON.stringify(filteredProduct, null, 2),
        "utf-8"
      );
      return filteredProduct;
    } catch (error) {
      throw new Error("Error al eliminar el producto: " + error.message);
    }
  }
}

export default ProductManager;
