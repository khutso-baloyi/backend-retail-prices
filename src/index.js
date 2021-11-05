require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const usersRoutes = require('./routes/users');
const userAuth = require('./routes/auth');
const Stores = require('./routes/stores');
const Products = require('./routes/products');

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());



//configure the app.
app.use('/users', usersRoutes);
app.use('/auth', userAuth);
app.use('/stores', authenticateToken, Stores);
app.use('/products', authenticateToken, Products);

app.get("/", (req, res) =>{
    res.send("hello world!");
});


//middleware function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //the second part of the bearer string . e.g Bearer adfadfhdafhgjkhlah
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        console.log("auth user", user)
        req.user = user;
        next();
    })
}


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});

