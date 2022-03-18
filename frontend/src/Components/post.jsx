import React from 'react';
import { Link } from 'react-router-dom';
import ReactionBar from './ReactionBar';
import * as auth from '../Services/auth'

function Post({post, ...props}) {
    console.log("render post")


    const {text, title, author , reactions, id, category, date, comments} = post;
    const userReaction = post.reactionsList.find( r => r.userId == auth.getLoggedUser()?.id)
//
  //  console.log(author)

    const url = `/post/${id}`;
    return ( < >
        <div className=" col-12 border mt-1 mb-1 p-3">
            <Link {...props} to={url} className='text-link'>
                    <h3  >{title}</h3>
                    <div className="row">
                        <div className="col-6">{category?.name}</div><div className="col-6" >{ new Date(date).toLocaleString()}</div>
                    </div>
                    <span>{text}</span>
                    <h5 className="text-right">{author.nick}</h5>
            </Link>
            {/* <ReactionBar postId={id} positiveCount={reactions.positive}  negativeCount={reactions.negative} userReaction={userReaction}/> */}
        </div>


    </>);
}

export default Post ;