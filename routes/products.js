const express = require('express');
const productRouter = express.Router();
const products = require('../db/product');

//localhost:8080/products
productRouter.get('/', (req, res) => {
    let responseObj = products.getProducts();
    res.render('index', { products: responseObj, type: 'Products', product: true });
});
productRouter.get('/new', (req, res) => {
    res.render('new', { product: true })
});
productRouter.get('/:id/edit', (req, res) => {
    let rpid = req.params.id;
    let responseObj = products.getProductById(rpid);
    res.render('editProduct', responseObj);
});
productRouter.get('/:id', (req, res) => {
    let rpid = req.params.id;
    let responseObj = products.getProductById(rpid);
    if (responseObj === false) {
        res.render('404', { type: 'products' });
    } else {
        responseObj.type = 'Product';
        responseObj.product = true;
        res.render('singles', responseObj);
    }
});
productRouter.post('/', (req, res) => {
    let responseObj = products.addProducts(req.body);
    if (typeof responseObj === 'boolean' && responseObj === false) {
        res.render('error', { type: 'products' });
    } else {
        res.redirect('/products');
    }
});
productRouter.put('/:id/edit', (req, res) => {
    let rpid = req.params.id;
    if (isNaN(req.body.price) || isNaN(req.body.inventory)) {
        res.redirect(`/products/${rpid}`);
    } else {
        products.editProduct(rpid, req.body, res);
        res.redirect(`/products/${rpid}`);
    }
});
productRouter.delete('/:id', (req, res) => {
    let rpid = req.params.id;
    products.deleteProduct(rpid, res);
    res.redirect('/products');
});

module.exports = productRouter;