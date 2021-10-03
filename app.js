const express = require('express');
const mysqlCon = require('./connection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);

app.get('/', (req, res)=>{
    res.send("Hi World!!");
});

const port = process.env.PORT || 3000;
app.listen(port);
