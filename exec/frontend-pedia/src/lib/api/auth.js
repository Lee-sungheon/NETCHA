import client from './client';

export const check = () => client.get('/api/auth/check');

export const getUserInfo = (token) => client.get('/user/getToken/' + token);

export const getUsername = (userId) =>
  client.get('/user/getUsername', { params: { seq: userId } });

export const logout = () => '()';
// export const logout = () => client.post('/user/logout');
