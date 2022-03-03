import http from "./http";


export   async function addComment(comment){
    return await http.post('/api/comment',comment); 
}

// export   async function deleteSpending(spending){
//     return await http.delete('/api/spendings/' + spending._id); 
// }


