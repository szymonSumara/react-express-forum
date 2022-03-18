const { validateComment , Comment } = require('../models/comment');
const { Post } = require('../models/post');
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post( '' , auth, async (request, response) => {
    
    const {body, user} = request;

    const {error} = validateComment({...body, userId : user.id });
    if(error) return response.status(400).send(error);
    const post = await Post.findById(body.postId);

    if(!post) return response.status(400).send("post with given id doesnt exist");
    
    const comment = new Comment({...body, userId : user.id });
    await comment.save();
    response.status(200).send(comment);
})



module.exports = router;



