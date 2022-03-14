import React, { Component, useState , useEffect} from 'react';
import Post from './post';
import {getPosts} from '../Services/posts';
import {Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import auth from '../Services/auth';

function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(async () => {
        if(!loading) return;
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setLoading(false);
        console.log(posts)
    });

    const updatePosts = async () => {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        console.log("Update posts")
    }

    useEffect(() =>{
        let interval = setInterval(() => updatePosts(),  (1000 * 3))
        //destroy interval on unmount
        return () => clearInterval(interval)
    })

    return ( <>
        {loading ? 
        <Spinner animation="border" />
        :    
        posts.map((post,index) => {
            const currentUserReaction = post.reactionsList.find( r => r.userId == auth.getLoggedUser()?.id)
            return <Post key={index} id={post.id} author={post.nick} title={post.title} text={post.text} reactions={post.reactions} userReaction={currentUserReaction?.positive}></Post>})
        }  

    </>);
}

export default Posts;