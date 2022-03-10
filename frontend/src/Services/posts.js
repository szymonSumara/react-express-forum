import http from "./http";

export  async function getPosts(){
    return http.get('/api/post');
}

export async function getPost(id){
    return http.get(`/api/post/${id}`);
}

export async function updatePost(id, body){
    return http.put(`/api/post/${id}`,body);
}

export   async function addPost(post){
    return await http.post('/api/post',post); 
}

// export   async function deleteSpending(spending){
//     return await http.delete('/api/spendings/' + spending._id); 
// }


