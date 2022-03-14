const mongoose = require('mongoose');
const joi = require('joi');

const reactionSchema = new mongoose.Schema({
    postId : {
        type: mongoose.Types.ObjectId
    },
    userId : {  
        type: mongoose.Types.ObjectId
    },
    positive: {
        type:mongoose.Schema.Types.Boolean
    },
    date : {
        type:mongoose.Date,
        default:new Date(),    }
})


module.exports.Reaction =  mongoose.model('reactions', reactionSchema);

module.exports.validateReaction = function(reaction){
    const shema = new joi.object({
        positive : joi.boolean().required(),
        postId : joi.string().required(),
        userId : joi.string().required(),
    })

    return shema.validate(reaction);
}

