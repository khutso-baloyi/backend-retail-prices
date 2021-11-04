require("dotenv").config();

const express = require("express");
const User = require('../controllers/stores');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Store = require("../controllers/stores");
const Auth = require("../controllers/auth");

//GET all stores

router.get('/', async (req, res) => {
    
    let stores = await new Store().getStores();

    res.send(stores)
});

router.get('/userstores', getUserId, async (req, res) => {
    let user_id = req.user_id;

    let stores_ids = await new Store().getUsersStores(user_id);

    res.send(stores_ids);
})

router.post('/addstore', getUserId, async (req, res) => {

    console.log("the req", req)
    let store_id = req.body.store_id;
    let user_id = req.user_id;

    let response = await new Store().addStore(user_id, store_id);

    res.send(response);
});

//middleware to get userId
async function getUserId(req, res, next) {

    username = req.user.username;

    let user = await new Auth().findUsername(username);

    req.user_id = user[0] && user[0].user_id;
    next();
}

module.exports = router;
