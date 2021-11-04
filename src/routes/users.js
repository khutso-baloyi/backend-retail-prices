require("dotenv").config();

const express = require("express");
const User = require('../controllers/users');
const router = express.Router();
const jwt = require('jsonwebtoken');

//GET all users

router.get('/', async (req, res) => {
    console.log("the user", req.user)
    let users = await new User().getUsers();

    res.send(users)
});

//Create a user

router.post('/user', async (req, res) => {
    let {username, password, store_id} = req.body;

    let user = await new User().createUser({username, password, store_id});

    const accessToken = jwt.sign({username, password}, process.env.ACCESS_TOKEN_SECRET );
    res.json({accessToken});
});

//Update a user
router.put('/user/:userid', authenticateToken, async (req, res) => {
    let {userid} = req.params;
    let {username, password} = req.body;
    let user = await new User().updateUser(userid, {username, password});
    if(user.rowCount == 1) {
        let users = await new User().getUsers();
        res.send(users)
    } else {
        res.send("user does not exist")
    }
    
});

//delete a user
router.delete('/user/:userid', async (req, res) => {
    let {userid} = req.params;
     let user_response = await new User().deleteUser(userid);
     
     if(user_response.rowCount == 1) {
        let users = await new User().getUsers();

        res.send(users)
     } else {
         res.send("the user you are trying to delete does not exist")
     }
    
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //the second part of the bearer string . e.g Bearer adfadfhdafhgjkhlah
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user = user;
        next();
    })
}





module.exports = router;