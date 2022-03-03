import http from "./http";

export  async function getSummary(options){
    return http.get('/api/summary',options);
}

