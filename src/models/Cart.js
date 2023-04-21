import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '..', 'data', 'cart.json');

export default class Cart {
  constructor() {
    this.id = new Date().valueOf().toString();
    this.products = [];
  }

  save() {
    const cartsData = fs.readFileSync(dataPath, 'utf-8');
    const carts = JSON.parse(cartsData);
    carts.push(this);
    fs.writeFileSync(dataPath, JSON.stringify(carts));
    return Promise.resolve(this);
  }

  static getById(id) {
    const cartsData = fs.readFileSync(dataPath, 'utf-8');
    const carts = JSON.parse(cartsData);
    const cart = carts.find(c => c.id === id);
    return cart;
  }
}
