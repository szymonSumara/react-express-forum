import React, { useEffect, useState } from 'react';
import { BsArrowDownCircleFill,BsFillArrowUpCircleFill ,BsArrowDownCircle , BsArrowUpCircle} from "react-icons/bs";
import * as reactionService from '../Services/reaction';
import  * as auth from '../Services/auth'

function ReactionBar({positiveCount, negativeCount, postId, userReaction}) {
    
    let actualReaction = ''
    if(userReaction) actualReaction = 'positive'
    else if( userReaction !== undefined )  actualReaction = 'negative'

    const [ reaction, setReaction ] = useState(actualReaction );
    const [ reactionCounts, setReactionCounts ] = useState({
        positive: positiveCount,
        negative: negativeCount,
    });


    const onLike = (e) => {
        if( reaction === 'negative'){
            reactionService.addReaction(postId, auth.getLoggedUser().id , true);
            reactionCounts.positive += 1;
            reactionCounts.negative -= 1;
            setReaction( 'positive')

        }
        else if(reaction === 'positive')
        {            
            reactionService.removeReaction(postId);
            reactionCounts.negative -= 1;
            setReaction('');                   

        }
        else if(reaction == ''){
            reactionService.addReaction(postId, auth.getLoggedUser().id , true);
            reactionCounts.positive += 1; 
            setReaction( 'positive');                   
        }

        setReactionCounts(reactionCounts);

    }

    const onDislike = (e) => {
        if( reaction == 'positive'){
            reactionService.addReaction(postId, auth.getLoggedUser().id , false);
            reactionCounts.positive -= 1;
            reactionCounts.negative += 1;
            setReaction( 'negative')

        }
        else if(reaction == 'negative')
        {            
            reactionService.removeReaction(postId);
            reactionCounts.negative -= 1;
            setReaction('');                   

        }
        else if(reaction == ''){
            reactionService.addReaction(postId, auth.getLoggedUser().id , false);
            reactionCounts.negative += 1; 
            setReaction( 'negative');                   
        }

        setReactionCounts(reactionCounts);
    }

    
    return (  
        <>
            <div class="row p-2">
                <div class="col-2">
                    <span className="p-2" >{reactionCounts.positive}</span>
                    <BsFillArrowUpCircleFill />
                </div>
                <div class="col-2">
                    <span className="p-2" >{reactionCounts.negative}</span>
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