import client from './client';

export const updateRank = (formData) => {
  return client.post('/movie/rank_update', formData);
};

export const deleteRank = (formData) => {
  return client.delete('/movie/rank_delete', { params: formData });
};

export const readRank = (movieNo) => {
  return client.get('/movie/rank_movie', { params: movieNo });
};
