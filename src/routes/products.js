require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require("../controllers/products");
const Auth = require("../controllers/auth");

//GET all products

router.get('/', async (req, res) => {
    
    let products = await new Product().getProducts();

    res.send(products)
});

router.get('/storeproducts/:storeid', async (req, res) => {
    let store_id = req.params.storeid;
    console.log("the store id")
    let products = await new Product().getStoreProducts(store_id);

    res.send(products);
})

router.post('/addproduct', async (req, res) => {

    let product = req.body.product;

    console.log("the sent message", product)

    let response = await new Product().addProduct(product);

    res.send(response);
});

router.post('/addstoreproduct', async (req, res) => {

    let product = req.body.product;

    let response = await new Product().addStoreProduct(product);

    res.send(response);
})

router.get('/findproduct/:barcode', async (req, res) => {

    let barcode = req.params.barcode;
    let response = await new Product().findProduct(barcode);
    
    // if(!response) {
    //     res.send("product does not exist")
    // } else {
    
    // res.send(response);
    // }
    res.send(response)
    
});

router.get('/findstoreproduct', async (req, res) => {
    let barcode = req.query.barcode;
    let store_id = req.query.storeId;

    let response = await new Product().findStoreProduct(store_id, barcode);

    res.send(response);
});

router.patch('/updateprice', async (req, res) => {

    let product = req.body.product;
    let response = await new Product().updateProductPrice(product);

    res.send(response);
})


module.exports = router;
