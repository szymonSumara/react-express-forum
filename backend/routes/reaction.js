const { Post } = require('../models/post');
const {Reaction, validateReaction} = require('../models/reaction')
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const {Comment} = require('../models/comment')


router.post( '' , auth, async (request, response) => {
    
    const {body, user} = request;

    const {error} = validateReaction({...body, userId : user.id });
    if(error) return response.status(400).send(error.message);
    const post = await Post.findById(body.postId);
    if(!post) return response.status(400).send("post with given id doesnt exist");

    let reaction = await Reaction.findOne({userId: user.id, postId: body.postId})
    console.log(reaction);
    if(reaction){
        console.log(reaction.positive , body.positive)
        if(reaction.positive != body.positive){
                        
            if(body.positive){
                post.reactions.positive += 1
                post.reactions.negative -= 1
            }else{
                post.reactions.negative += 1
                post.reactions.positive -= 1
            }
            

            const result = await Reaction.updateOne(reaction, { positive : body.positive});
            console.log(result);
            const postUpdated = await Post.updateOne({_id:post._id}, {reactions: post.reactions});
            console.log("postUpdated:", postUpdated)
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

// router.get( '' , auth, async (request, response) => {
    
//     const {body, user} = request;
//     console.log(body, user);

//     const {error} = validateComment({...body, userId : user.id });
//     if(error) return response.status(400).send(error);
//     const post = await Post.findById(body.postId);
//     if(!post) return response.status(400).send("post with given id doesnt exist");

//     const reaction = new Comment({...body, userId : user.id });
//     await reaction.save();
//     response.status(200).send(reaction);
// })


// router.put( '' , auth, async (request, response) => {
    
//     const {body, user} = request;
//     console.log(body, user);

//     const {error} = validateComment({...body, userId : user.id });
//     if(error) return response.status(400).send(error);
//     const post = await Post.findById(body.postId);
//     if(!post) return response.status(400).send("post with given id doesnt exist");

//     const reaction = new Comment({...body, userId : user.id });
//     await reaction.save();
//     response.status(200).send(reaction);
// })


// router.delete( '' , auth, async (request, response) => {
    
//     const {body, user} = request;
//     console.log(body, user);

//     const {error} = validateComment({...body, userId : user.id });
//     if(error) return response.status(400).send(error);
//     const post = await Reaction.findOne({});
//     if(!post) return response.status(400).send("post with given id doesnt exist");

//     const reaction = new Comment({...body, userId : user.id });
//     await reaction.save();
//     response.status(200).send(reaction);
// })

module.exports = router;



