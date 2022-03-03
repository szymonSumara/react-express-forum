import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import Comment from './comment';
import {getPost} from '../Services/posts'
import AddComment from './addComment';
import auth from '../Services/auth';

function PostPreview() {
    let {id} = useParams();

const [post, setPost] = useState([]);
const [loading, setLoading] = useState(true);

useEffect( () => {
    if(!loading) return;
    const fetchData = async () => {
        const fetchedPost = await getPost(id);
        console.log(fetchedPost)
        setPost(fetchedPost);
        setLoading(false);
    }
    fetchData();
});



return ( <>
    {loading ? 
    <Spinner animation="border" />
    :    
    <>
    <div  className='text-link col-12 border mt-1 mb-1 p-2'>
            <h3>{post.title}</h3>
            <span>{post.text}</span>
            <h5>{post.author}</h5>
    </div>
    {post.comments.map( (com,index) => {return <Comment key={index} text={com.text} author={com.author}></Comment>})}
    <AddComment postId={id} userId={auth.getLoggedUser().id} />
    </>
    }
</>);
}

export default PostPreview;