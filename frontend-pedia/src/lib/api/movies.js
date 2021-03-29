import client from './client';

const movie = {
  data: { title: '미나리' },
};

export const readMovie = (id) => {
  console.log(movie);
  return movie;
  // client.get(`/api/posts/${id}`)
};
