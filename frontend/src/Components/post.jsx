import React from 'react';
import { Link } from 'react-router-dom';
import ReactionBar from './ReactionBar';

function Post ({id,author, title, text,reactions,userReaction, ...props}) {
    console.log(reactions)
    const url = `/post/${id}`;
    return ( < >
        <div className=" col-12 border mt-1 mb-1 p-3">
            <Link {...props} to={url} className='text-link'>
                    <h3>{title}</h3>
                    <span>{text}</span>
                    <h5>{author}</h5>
                    
            </Link>
            <ReactionBar postId={id} positiveCount={reactions.positive} negativeCount={reactions.negative} userReaction={userReaction}/>
        </div>


    </>);
}

export default Post ;