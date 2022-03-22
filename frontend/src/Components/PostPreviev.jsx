import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import Comment from './Comment';
import {getPost} from '../Services/posts'
import AddComment from './AddComment';
import * as  auth from '../Services/auth';
import Post from './Post'


function PostPreview() {
    let {id} = useParams();


const [data, setData] = useState({
    loading : true,
    post: null,
})

useEffect( () => {
    if(!data.loading) return;
    const fetchData = async () => {
        const fetchedPost = await getPost(id);
        console.log(fetchedPost)
        
        setData({
            post:fetchedPost,
            loading:false,
        })
    }
    fetchData();
});

const onCommentAdd = (text) => {
    console.log('onCommentAdd', text)
    if(data.post)
    if(data.post.comments)
    setData({
        post:{...post, comments: [...post.comments, {author:auth.getLoggedUser().nick,text}]},
        loading:false,
    })
}

const currentUserId = auth.getLoggedUser()?.id;
console.log(currentUserId)

const {post, loading} = data;
console.log(post,loading)
return ( <>
    {loading ? 
    <Spinner animation="border" />
    :    
    <>
        <Post post={post} />
        {post.comments.map( (com,index) => {return <Comment key={index} text={com.text} author={com.author}></Comment>})}
        <AddComment postId={id} userId={auth.getLoggedUser().id} onAddComment={onCommentAdd} />
    </>
    }
</>);
}

export default PostPreview;