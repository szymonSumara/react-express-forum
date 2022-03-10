const express = require("express");
const router = express.Router();
const {validatePost, Post }= require('../models/post'); 
const auth = require('../middleware/auth');
const {Account} = require('../models/account');
const {Comment} = require('../models/comment');

router.get( '/',async  ( request, response ) => {
    console.log("Get all posts");

    const posts = await Post.find();
    const users = await Account.find();


    setTimeout( () => { response.send(posts.map( post => {
        return {
            id: post._id,
            title: post.title,
            text: post.text,
            nick : users.find( user => {
                console.log(post.userId, user._id,post.userId?.toString() == user._id?.toString() );
                return post.userId?.toString() == user._id?.toString() })?.nick
        }
    }));},300)
   
})

router.get( '/:id', async ( request, response ) => {
    const postId  = request.params.id;
    const post = await Post.findById(request.params.id);

    if(!post) return response.status(404).end("Post with given id doesnt exists");
    
    const users = await Account.find();
    const comments = await Comment.find({postId : postId})

    response.send({
        title: post.title,
        text: post.text,
        author : users.find((u) => u._id?.toString() === post.userId?.toString())?.nick,
        comments : comments.map( (com) => {
            return {
                text : com.text,
                author : users.find((u) => u._id?.toString() === com.userId?.toString())?.nick
            }
        })
    });
})

router.put('/:id', auth, async ( request,response ) => {

    const postId = request.params.id;
    const post = await Post.findById(postId);
    
    const {body, user} = request;
    
    if(!post) return response.status(404).send("Post with given id doesnt exits !!!");
    if(user.id != post.userId) return response.status(403).send("User can only edid own posts");
    const validationResult = validatePost({...body, userId : user.id});
    if(validationResult.error) return response.status(400).send(validationResult.error);
    const updatedPost =  await Post.updateOne( {_id: postId}, {...body, userId : user.id});
    

    
    return response.send(updatedPost);
})

router.delete('/:id', auth, async ( request, response ) => {

    const postId = request.params.id;
    const post = await Post.findById(postId);
    const {user} = request;

    if(!post) return response.status(404).send("Not found specyfic post !!!");
    if(user.id != post.userId) return response.status(403).send("User can only remove own hosts");
    await Post.findOneAndRemove({_id:postId});
    return response.status(200).send(post);
})

router.post( '', auth, async  ( request, response ) => {
    const {body, user} = request;
    const errors = validatePost({...body,userId : user.id });
    if(errors.error) return response.status(400).send(errors);
    const post = new Post({...body,userId : user.id });
    await post.save();
    return response.status(200).send(post);
})


module.exports = router;