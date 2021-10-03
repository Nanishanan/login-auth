const express = require('express');
const mysqlCon = require('./connection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);

const port = process.env.port || 3000;
app.listen(port);
