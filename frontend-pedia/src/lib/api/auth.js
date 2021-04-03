import client from './client';

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/user/logout');