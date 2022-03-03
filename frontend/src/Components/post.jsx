import React from 'react';
import { Link } from 'react-router-dom';

function Post ({id,author, title, text, ...props}) {
    
    const url = `/post/${id}`;
    return ( <>
    <Link {...props} to={url} className='text-link col-12 border mt-1 mb-1 p-2'>
            <h3>{title}</h3>
            <span>{text}</span>
            <h5>{author}</h5>
    </Link>
    </>);
}

export default Post ;