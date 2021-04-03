import client from './client';

export const updateRank = (formData) => {
  return client.post('/movie/rank_update', formData);
};
