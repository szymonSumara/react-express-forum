const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const {Account} = require('../models/account');
const config = require('config');


router.post('', async (request, response) => {

    const {login, password } = request.body;

    if(login === undefined ) return response.status(400).send("login");
    if(password === undefined ) return response.status(400).send("password");
   
    const account = await Account.findOne({ login : login});

    if( account === undefined ) return response.status(400).send("accound doesnt exist");

    const sha256Hasher = crypto.createHash('sha256');
    const hashedPasword = sha256Hasher.update(password).digest("hex");
    console.log(hashedPasword, account);
    if(account.password !== hashedPasword) return response.status(200).send("Log error");
    else return response.status(200).send({
        "auth-token": jwt.sign({
            id : account._id,
            nick: account.nick
        }, config.get('token-key')),
    });


})


module.exports = router;
