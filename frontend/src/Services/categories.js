import http from "./http";

export  async function getCategories(){
    return http.get('/api/category');
}
