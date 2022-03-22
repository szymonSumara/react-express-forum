import http from "./http";

export  async function getPosts(page, limit, category){
    if(page && limit && category)
    return http.get(`/api/post?page=${page}&limit=${limit}&category=${category}`);
    if(page && limit)
    return http.get(`/api/post?page=${page}&limit=${limit}`);

    return http.get('/api/post');
}

export async function getPost(id){
    return http.get(`/api/post/${id}`);
}

export async function updatePost(id, body){
    return await http.put(`/api/post/${id}`,body);
}

export   async function addPost(post){
    return await http.post('/api/post',post); 
}

export   async function deletePost(id){
    return await http.delete(`/api/post/${id}`); 
}

// export   async function deleteSpending(spending){
//     return await http.delete('/api/spendings/' + spending._id); 
// }


