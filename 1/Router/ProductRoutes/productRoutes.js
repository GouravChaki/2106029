const express = require('express');
const products = require('../../Modules/Products/products');
const singleProduct = require('../../Modules/SingleProduct/singleProduct');
const router = express.Router();

router.get('/categories/:categoryname/products',products);

router.get('/categories/:categoryname/products/:productid',singleProduct);

module.exports = router;