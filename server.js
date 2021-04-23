// Initial Setup
const express = require('express');
const app = express();

app.use(express.json());

// LowDB Setup
const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('db.json');
const db = low(adapter);
const products = db.get('products').value();

// ES6 Module Setup
const addProduct = require('./add.js');
const removeProduct = require('./remove.js');

// Get all products
app.get('/api/products', function (request, response) {
    response.send(products);
});

// Get cart
app.get('/api/cart', function (request, response) {
    const cart = db.get('cart').value();
    response.send(cart);
});

// Add product to cart
app.post('api/add/:id', function (request, response) {
    addProduct.addItem(products, request, response, db);
});

// Delete product from cart
app.delete('/api/remove/:id', function (request, response) {
    removeProduct.removeItem(products, request, response, db);
});

app.listen(8000, () => {
    console.log('Server started');
});