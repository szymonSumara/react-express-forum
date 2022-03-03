const express = require("express");
const router = express.Router();
const {validateAccount, Account }= require('../models/account'); 
const crypto = require('crypto');

router.get( '/', ( request, response ) => {
    response.send("get all posts");
})

router.get( '/:id', ( request, response ) => {
    response.send("dupa " + request.params.id);
})


router.post( '', ( request, response ) => {
    console.log(request.body);
    const errors = validateAccount(request.body);
    console.log(errors.error);
    if(errors.error) return response.status(400).send(errors);
    
    const sha256Hasher = crypto.createHash('sha256');
    request.body.password = sha256Hasher.update(request.body.password).digest("hex");
    const account = new Account(request.body);
    account.save();
    return response.status(200).send(account);
})


module.exports = router;