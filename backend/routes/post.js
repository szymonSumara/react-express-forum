const express = require("express");
const router = express.Router();
const {validatePost, Post }= require('../models/post'); 
const auth = require('../middleware/auth');
const {Account} = require('../models/account');
const {Comment} = require('../models/comment');
const { Reaction } = require("../models/reaction");
const { Category } = require("../models/category");





const buildPosts = async () => {

    const posts = await Post.find().sort({date: 'desc'});
    const users = await Account.find();
    const reactions = await Reaction.find();
    const categories = await Category.find();

    return  posts.map( post => {

        const author = users.find( user => {
            return post.userId?.toString() == user._id?.toString() 
        })

        return {
            id: post._id,
            title: post.title,
            text: post.text,
            date: post.date,
            category: categories
                .find( c => post.categoryId?.toString() == c.id.toString()),
            reactionsList : reactions
                .filter( r =>  post._id?.toString() == r.postId?.toString())
                .map(r => {return { userId : r.userId, positive: r.positive}}),
            reactions: post.reactions,
            author : {
                id : author._id,
                nick : author.nick
            }
        }
    })
}

const filterPosts = ( posts, query ) => {

    let categoryFilter = query.category;
    let page = query.page;
    let limit = query.limit;

    if(categoryFilter)posts = posts.filter( p => p.category?.name === categoryFilter )
    
    const beforePaggingCount = posts.length;

    if(page && limit){
        posts = posts.slice((page -1)*limit , page*limit);     
    }

    return [posts, beforePaggingCount ];
}


router.get( '/',async  ( request, response ) => {
    
    let posts = await buildPosts();
    let beforePaggingCount = null;
    [posts, beforePaggingCount] = filterPosts(posts, request.query);
    setTimeout( () => { response.status(200).send({
        totalNumber:beforePaggingCount,
        posts:posts},200)})
})

router.get( '/:id', async ( request, response ) => {
    const postId  = request.params.id;
    const post = await Post.findById(request.params.id);

    if(!post) return response.status(404).end("Post with given id doesnt exists");
    
    const users = await Account.find();
    const comments = await Comment.find({postId : postId})
    const category = await Category.find();
    const reactions = await Reaction.find();


    const author = users.find( user => {
        return post.userId?.toString() == user._id?.toString() 
    })

    response.send({
        id: post._id,
        title: post.title,
        text: post.text,
        author : users.find((u) => u._id?.toString() === post.userId?.toString())?.nick,
        reactions: post.reactions,
        category: category.find(c => post.categoryId == c.id),
        date: post.date,
        reactionsList : reactions
        .filter( r =>  post._id?.toString() == r.postId?.toString())
        .map(r => {return { userId : r.userId, positive: r.positive}}),
        comments : comments.map( (com) => {
            return {
                text : com.text,
                author : users.find((u) => u._id?.toString() === com.userId?.toString())?.nick
            }
        }),
        author : {
            id : author._id,
            nick : author.nick
        }
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
    const category = await Category.findById(body.categoryId)
    if(!category)
        return response.status(400).send("Category doesnt exist");
    const post = new Post({...body,userId : user.id });
    
    await post.save();
    return response.status(200).send(post);
})


module.exports = router;