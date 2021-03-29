import client from './client';

export const readMovie = id => client.get(`/api/posts/${id}`);