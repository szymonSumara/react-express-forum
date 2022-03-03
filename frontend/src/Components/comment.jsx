import React from 'react';

function Comment ({author,  text, ...props}) {
        console.log(author, text)
        return ( <>
    <div  className='col-12 border mt-1 mb-1 p-2' {...props}>
            <span>{text}</span>
            <h5>{author}</h5>
    </div>
    </>);
}

export default Comment ;