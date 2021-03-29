import client from './client';

const movie = { id: 1, movieName: '미나리' };

export const readMovie = (id) => {
  console.log(id);
  return movie;
  // client.get(`/api/posts/${id}`)
};
