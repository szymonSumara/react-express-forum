import http from './http';

export const register = (userData) => {
    return http.post('/api/account',userData);
}

