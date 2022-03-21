const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const {Account} = require('../models/account');
const config = require('config');


router.post('', async (request, response) => {

    const { login, password } = request.body;

    if(login === undefined ) 
        return response.status(400).send("Login is required");
    if(password === undefined ) 
        return response.status(400).send("Password is required");
   
    const account = await Account.findOne({ login : login});
    if( !account ) 
        return response.status(400).send("Login or Password is invalid!!");

    const sha256Hasher = crypto.createHash('sha256');
    const hashedPasword = sha256Hasher.update(password).digest("hex");

    if(account.password !== hashedPasword) return response.status(400).send("Login or Password is invalid!!!");
    else return response.status(200).send({
        "auth-token": jwt.sign({
            id : account._id,
            nick: account.nick
        }, config.get('JWT_KEY')),
    });
})


module.exports = router;
