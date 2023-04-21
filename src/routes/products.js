import express from 'express';
import { getAll as getAllProducts, getById } from '../models/product.js';

const router = express.Router();

// GET /api/products/
router.get('/', (req, res) => {
  const products = getAllProducts();
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// GET /api/products/:pid
router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = getById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send(`Product with id ${pid} not found`);
  }
});

export default router;
