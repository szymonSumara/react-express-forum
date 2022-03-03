const mongoose = require('mongoose');
const joi = require('joi');

const commentSchema = new mongoose.Schema({
    postId : {
        type: mongoose.Types.ObjectId
    },
    userId : {  
        type: mongoose.Types.ObjectId
    },
    text : {
        type:String
    },
    date : {
        type:mongoose.Date,
        default:new Date(),    }
})


module.exports.Comment =  mongoose.model('comments', commentSchema);

module.exports.validateComment = function(comment){
    const shema = new joi.object({
        text : joi.string().required(),
        postId : joi.string().required(),
        userId : joi.string().required(),
    })

    return shema.validate(comment);
}

