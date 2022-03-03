const mongoose = require('mongoose');
const joi = require('joi');

const accountShema = new mongoose.Schema({
    login:{
        type: String,
        minlength: 5,
        maxlength: 15,
    },
    nick: {
        type:String,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type:String,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        minlength: 64,
        maxlength: 256,
    }
});

const Account = mongoose.model('accounts', accountShema);

exports.validateAccount = (account) => {
    const schema = joi.object({
        login : joi.string().min(5).max(15).required(),
        nick : joi.string().min(3).max(50).required(),
        email : joi.string().email().required() ,
        password : joi.string().required()
    })

    return schema.validate(account);
} 

exports.Account = Account;

