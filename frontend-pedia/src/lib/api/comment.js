import client from './client';

export const insertComment = (formData) => {
  return client.post('/movie/review_insert', formData);
};

export const deleteComment = (formData) => {
  return client.delete('/movie/review_delete', { params: { ...formData } });
};

export const readComments = (formData) => {
  return client.get('/movie/review_list', { params: { ...formData } });
};
