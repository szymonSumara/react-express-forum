const { Post } = require('../models/post');
const {Reaction, validateReaction} = require('../models/reaction')
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post( '' , auth, async (request, response) => {
    
    const {body, user} = request;

    const {error} = validateReaction({...body, userId : user.id });
    if(error) return response.status(400).send(error.message);
    
    const post = await Post.findById(body.postId);
    if(!post) return response.status(400).send("post with given id doesnt exist");

    let reaction = await Reaction.findOne({userId: user.id, postId: body.postId})
    
    if(reaction){
        if(reaction.positive != body.positive){
                        
            if(body.positive){
                post.reactions.positive += 1
                post.reactions.negative -= 1
            }else{
                post.reactions.negative += 1
                post.reactions.positive -= 1
            }
            
            await Reaction.updateOne({_id: reaction._id}, { positive : body.positive});
            await post.save();
        }

        response.status(200).send({});

    }else{
        reaction = new Reaction({...body, userId : user.id });
        await reaction.save();
    
        if(reaction.positive)
            post.reactions.positive += 1
        else
            post.reactions.negative += 1
        
        post.save();
    
        response.status(200).send(reaction);
    }

})

router.delete( '' , auth, async (request, response) => {
    
    const {body, user} = request;

    const reaction = await Reaction.findOneAndDelete({userId: user.id, postId: body.postId});
    if(reaction){
        const post = await Post.findById(body.postId);
        if(post){
            if(reaction.positive)
                post.reactions.positive -= 1;
            else
                post.reactions.negative -= 1;
            post.save()
        }
    }
    response.status(200).send();
})

module.exports = router;



