import client from './client';

export const readComment = (formData) => {
  return client.get('/movie/review_detail', { params: { ...formData } });
};

export const insertComment = (formData) => {
  return client.post('/movie/review_insert', formData);
};

export const updateComment = (formData) => {
  return client.post('/movie/review_update', formData);
};

export const deleteComment = (formData) => {
  return client.delete('/movie/review_delete', { params: { ...formData } });
};

export const readComments = (formData) => {
  return client.get('/movie/review_list', { params: { ...formData } });
};

export const insertCommentLike = (formData) => {
  return client.post('/movie/review_like_insert', formData);
};

export const deleteCommentLike = (formData) => {
  return client.delete('/movie/review_like_delete', {
    params: { ...formData },
  });
};
