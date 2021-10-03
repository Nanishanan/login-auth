'use strict';
const { triggerAsyncId } = require('async_hooks');
var mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config( { path: './.env' } )

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

con.connect((err)=>{
    if(err){
        console.log("Conection Failed :( !!", JSON.stringify(err));
    } else {
        console.log("Conection Successfull !!");
    }
});

module.exports = con;
