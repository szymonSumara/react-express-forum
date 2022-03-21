const express = require("express");
const router = express.Router();
const crypto = require('crypto');

const { validateAccount, Account }= require('../models/account'); 


router.post( '', ( request, response ) => {

    const validateError = validateAccount(request.body);
    console.log(validateError.error);
    if(validateError.error) return response.status(400).send(validateError.error.details[0].message);
    
    const sha256Hasher = crypto.createHash('sha256');
    request.body.password = sha256Hasher.update(request.body.password).digest("hex");

    const account = new Account(request.body);
    account.save();
    return response.status(200).send(account);
})


module.exports = router;