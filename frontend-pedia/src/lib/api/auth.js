import client from './client';

export const check = () => client.get('/api/auth/check');

export const getUserInfo = (token) => client.post('/user/getToken', token);

export const logout = () => '()';
// export const logout = () => client.post('/user/logout');
