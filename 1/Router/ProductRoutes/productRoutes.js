const express = require('express');
const products = require('../../Modules/Products/products');
const router = express.Router();

router.get('/categories/:categoryname/products',products);

module.exports = router;