const mongoose = require('mongoose');
const joi = require('joi');

const postShema = new mongoose.Schema({
   id:{
        type:mongoose.ObjectId,
   },
   userId : {
       type:mongoose.ObjectId
   },
   topic : {
    type:String,
   },
   text:{
    type:String,

   },
   date : {
    type:mongoose.Date,
    default:new Date(),   }
});

const Post = mongoose.model('posts', postShema);

exports.validatePost  = (post) => {
    const schema = joi.object({
        userId : joi.string().required(),
        topic : joi.string().min(3).max(50).required(),
        text : joi.string().min(3).max(1024).required() ,
    })

    return schema.validate(post);
} 

exports.Post = Post;

