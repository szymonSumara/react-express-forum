import http from "./http";

export  async function addReaction(postId, userId, positive){
    return http.post('/api/reaction',
    {postId,userId,positive});
}

export async function removeReaction(postId){
    return http.delete('/api/reaction', {postId})
}
// export   async function deleteSpending(spending){
//     return await http.delete('/api/spendings/' + spending._id); 
// }


