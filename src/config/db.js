const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user:'postgres', // default postgres
    host:'localhost',
    database:'retaildb', 
    password: process.env.DB_PASSWORD, //added during PostgreSQL and pgAdmin installation
    port:'5432' //default port
});

module.exports = pool;