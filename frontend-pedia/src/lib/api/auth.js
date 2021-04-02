import client from './client';

export const check = () => client.get('/api/auth/check');