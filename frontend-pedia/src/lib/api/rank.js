import client from './client';

export const updateRank = (formData) => {
  return client.post('/movie/rank_update', formData);
};

export const readRank = (movieNo) => {
  return client.get('/movie/rank_movie', { params: movieNo });
};
