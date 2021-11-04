const express = require("express");
require("dotenv").config();

const Auth = require('../controllers/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');


//authenticate a user
router.post('/login', async (req, res) => {

    let {username, password} = req.body;  
   
    //first find out if username is available
    let isUserAvail = await new Auth().findUsername(username);

    if(isUserAvail.length == 1) {
        //compare the user password to the database user password
        if(isUserAvail[0].password === password) {
            //the user can log in. start the jwt token thingy
            const accessToken = jwt.sign({username, password}, process.env.ACCESS_TOKEN_SECRET );
            res.json({accessToken})
        } else {
            //the password is incorrect
            res.status(401).send('password incorrect')
        }

    } else {
        //the username does not exist
        res.status(401).send('user does not exist')
    }

    console.log("is user avail: ",isUserAvail)

});


module.exports = router;