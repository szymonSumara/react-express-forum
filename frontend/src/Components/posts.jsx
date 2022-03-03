import React, { Component, useState , useEffect} from 'react';
import Post from './post';
import {getPosts} from '../Services/posts';
import {Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(async () => {
        if(!loading) return;
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setLoading(false);
    });

    return ( <>
        {loading ? 
        <Spinner animation="border" />
        :    
        posts.map((post,index) => 
            {
               
                return <Post key={index} id={post.id} author={post.nick} title={post.title} text={post.text} ></Post>})}  

    </>);
}

export default Posts;