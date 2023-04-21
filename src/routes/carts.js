import express from 'express';
import Cart from '../models/Cart.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { __dirname } from '../utils.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const cart = new Cart();
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:cid', (req, res) => {
  const cart = Cart.getById(req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const { quantity } = req.body;
    const cart = Cart.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const product = cart.products.find(p => p.id == pid);
    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ id: pid, quantity });
    }
    const updatedCart = await cart.save();
    res.json(updatedCart.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
