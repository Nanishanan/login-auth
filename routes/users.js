const express = require('express');
const Router = express.Router();
const con = require('../connection');
const bodyParser = require('body-parser');
const { json } = require('express');

var jsonParser = bodyParser.json();

// Router.get('/', (req, res)=>{
//     con.query("SELECT * from auth", (err, rows, fields)=>{
//         if(!err){
//             res.send(rows);
//             console.log("Worked Bitch !!!!!!!!!!!!!!!!!");
//         }
//         else {
//             console.log(err);
//         }
//     })
// });

// Login to account
Router.post('/', (req, res)=>{
    var sql = "SELECT * from auth \
               WHERE user_name=? AND user_password=?"
    con.query(sql, [req.body.user_name, req.body.user_password],  (err, rows, fields)=>{
        if(!err){
            if(rows[0]){
                // res.send("Welcome to Great Kirikalam Magic show");
                res.send(rows[0]);
            } else
                res.send("Wrong Credentials entered. Please give the correct username and password");
        }
        else {
            console.log(err);
        }
    })
});


// Router.get('/:id', (req, res)=>{
//     con.query("SELECT * from auth WHERE user_id = ?", [req.params.id], (err, rows, fields)=>{
//         if(!err){
//             res.send(rows);
//             console.log("Worked Bitch !!!!!!!!!!!!!!!!!");
//         }
//         else {
//             console.log(err);
//         }
//     })
// });

//Signup user
Router.post('/signup', jsonParser, (req, res)=>{
    let user = req.body;
    var sql = "SET @userId=?; SET @userName=?; SET @userEmail=?; SET @userPhone=?; SET @userPassword=?; \
    CALL addoredituser(@userId,@userName,@userEmail,@userPhone,@userPassword)";
    con.query(sql, [0, user.user_name, user.user_email, user.user_phone, user.user_password], (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});


//Edit user
Router.put('/:id', jsonParser, (req, res)=>{
    let user = req.body;
    var user_email, user_phone, user_password;
    var sql = "SET @userId=?; SET @userEmail=?; SET @userPhone=?; SET @userPassword=?; \
    CALL addoredituser(@userId,@userName,@userEmail,@userPhone,@userPassword)";

    con.query("SELECT * from auth where user_id = ?", [req.params.id], (err, rows)=>{
        if(!err){
            user_email = user.user_email || rows[0].user_email;
            user_phone = user.user_phone || rows[0].user_phone;
            user_password = user.user_password || rows[0].user_password;
        } else {
            JSON.stringify(err);
        }
        console.log(rows[0]);
        console.log("user_password in: " + user_password);

        con.query(sql, [req.params.id , user_email, user_phone, user_password], (err, rows, fields)=>{
            if(!err){
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    });

    console.log("user_password out: " + user_password);
});

module.exports = Router;