import client from './client';

export const updateRank = (formData) => {
  return client.post('/movie/update_rank', formData);
};
