import client from './client';

export const listLikeActors = ({ userId }) => {
  return client.get(`/movie/userFavor_cast?userId=${userId}`)
};

export const listLikeDirectors = ({ userId }) => {
  return client.get(`/movie/userFavor_director?userId=${userId}`)
};

export const listCountries = ({ userId }) => {
  return client.get(`/movie/userFavor_country?userId=${userId}`)
}

export const listGenres = ({ userId }) => {
  return client.get(`/movie/userFavor_ganre?userId=${userId}`)
}

export const listTags = ({ userId }) => {
  return client.get(`/movie/userFavor_keyword?userId=${userId}`)
}

export const listStars = ({ userId }) => {
  return client.get(`/movie/rank_user?userId=${userId}`)
}
