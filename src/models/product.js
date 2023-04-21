import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '..', 'data', 'products.json');

class Product {
  constructor(title, description, code, price, status, stock, category, thumbnails) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
  }

  static getAll() {
    const productsData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(productsData);
    return products;
  }

  static getById(id) {
    const productsData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(productsData);
    const product = products.find(p => p.id == id);
    return product;
  }

  static add(product) {
    const productsData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(productsData);
    product.id = Date.now().toString();
    product.status = true;
    products.push(product);
    fs.writeFileSync(dataPath, JSON.stringify(products));
    return Promise.resolve(product);
  }

  static updateById(id, updatedProduct) {
    const productsData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(productsData);
    const productIndex = products.findIndex(p => p.id == id);
    if (productIndex == -1) {
      throw new Error('Product not found');
    }
    const product = products[productIndex];
    products[productIndex] = {
      ...product,
      ...updatedProduct,
    };
    fs.writeFileSync(dataPath, JSON.stringify(products));
    return products[productIndex];
  }

  static deleteById(id) {
    const productsData = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(productsData);
    const productIndex = products.findIndex(p => p.id == id);
    if (productIndex == -1) {
      return Promise.reject({ error: 'Product not found' });
    }
    const product = products[productIndex];
    products.splice(productIndex, 1);
    fs.writeFileSync(dataPath, JSON.stringify(products));
    return Promise.resolve(product);
  }
}

export default Product;
