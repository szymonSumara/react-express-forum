import React, { useEffect, useState } from 'react';
import { BsArrowDownCircleFill,BsFillArrowUpCircleFill ,BsArrowDownCircle , BsArrowUpCircle} from "react-icons/bs";
import * as reactionService from '../Services/reaction';
import  auth from '../Services/auth'

function ReactionBar({positiveCount, negativeCount, postId, userReaction}) {
    


    let actualReaction = ''
    if(userReaction) actualReaction = 'positive'
    else if( userReaction !== undefined )  actualReaction = 'negative'

    const [reaction, setReaction] = useState(actualReaction );
    


    const onLike = (e) => {
        if( reaction != 'positive'){
            setReaction( 'positive')
            reactionService.addReaction(postId, auth.getLoggedUser().id , true);
        }else
        setReaction( '')

    }

    const onDislike = (e) => {
        if( reaction != 'negative'){
            setReaction( 'negative')
            reactionService.addReaction(postId, auth.getLoggedUser().id , false);
        }else{
            setReaction( '')
        }
           
    }

    
    return (  
        <>
            <div class="row p-2">
                <div class="col-2">
                    <span className="p-2" >{positiveCount}</span>
                    <BsFillArrowUpCircleFill />
                </div>
                <div class="col-2">
                    <span className="p-2" >{negativeCount}</span>
                    <BsArrowDownCircleFill />
                </div>
                <div class="col-6"></div>
                <div class="col-1 float-right" onClick={onLike}>
                    {
                        reaction !='positive' ?
                            <BsArrowUpCircle size={26}/> 
                        :
                            <BsFillArrowUpCircleFill  size={26}/>
                    }
                </div>
                <div class="col-1 float-right" onClick={onDislike}>
                    {
                        reaction !='negative' ?
                        <BsArrowDownCircle size={26}/> 
                        :
                        <BsArrowDownCircleFill  size={26}/>
                    }
                </div>
            
            </div>
        </>

    );
}

export default ReactionBar;