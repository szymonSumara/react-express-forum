import http from './http';

export const register = (userData) => {
    http.post('/api/account',userData);
}

