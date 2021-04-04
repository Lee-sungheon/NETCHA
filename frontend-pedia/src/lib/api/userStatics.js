import client from './client';

export const listLikeActors = ({ userId }) => {
  console.log('listLikeActors:' + userId);
  // return actors;
  return client.get(`/movie/userFavor_cast?userId=${userId}`)
};

export const listLikeDirectors = ({ userId }) => {
  console.log('listLikeDirectors:' + userId);
  // return directors;
  return client.get(`/movie/userFavor_director?userId=${userId}`)
};

export const listCountries = ({ userId }) => {
  console.log('listCountries:' + userId);
  // return country;
  return client.get(`/movie/userFavor_country?userId=${userId}`)
}

export const listGenres = ({ userId }) => {
  console.log('listGenres:' + userId);
  // return genre;
  return client.get(`/movie/userFavor_ganre?userId=${userId}`)
}

export const listTags = ({ userId }) => {
  console.log('listTags:' + userId);
  return tags;
  // return client.get(`/country/${userId}`)
}

export const listStars = ({ userId }) => {
  console.log('listStars:' + userId);
  return stars;
  // return client.get(`/country/${userId}`)
}

const stars = {data: [2, 3, 1, 1, 3, 8, 4, 7, 13, 11]};

const tags = {
  data: [
  {
    text: '연기력',
    value: 200,
  },
  {
    text: '연기력',
    value: 90,
  },
  {
    text: '배경이 예쁜',
    value: 80,
  },
  {
    text: '카리스마',
    value: 70,
  },
  {
    text: '연기력',
    value: 60,
  },
  {
    text: '블록버스터',
    value: 50,
  },
  {
    text: '연기력',
    value: 40,
  },
  {
    text: '액션',
    value: 30,
  },
  {
    text: '슬픈',
    value: 64,
  },
  {
    text: '웃긴',
    value: 64,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '한국배경',
    value: 17,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
]};

const country = {
  data: [
  {
    id: 1,
    name: '한국',
    count: 27
  },
  {
    id: 2,
    name: '미국',
    count: 9
  },
  {
    id: 3,
    name: '영국',
    count: 13
  },
]};

const genre = {
  data : [
  {
    id: 1,
    name: '드라마',
    count: 25
  },
  {
    id: 2,
    name: '액션',
    count: 9
  },
  {
    id: 3,
    name: '코미디',
    count: 13
  },
]};

const directors = {
  data: [
    {
      id: 1,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 2,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 3,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 4,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 5,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 6,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 7,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 8,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 9,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
  ],
};

const actors = {
  data: [
    {
      id: 1,
      name: '임시완',
      image: '/images/임시완.jpg',
    },
    {
      id: 2,
      name: '박규영',
      image: '/images/박규영.jpg',
    },
    {
      id: 3,
      name: '이도현',
      image: '/images/이도현.jpg',
    },
    {
      id: 4,
      name: '한예리',
      image: '/images/한예리.jpg',
    },
    {
      id: 5,
      name: '신세경',
      image: '/images/신세경.jpg',
    },
    {
      id: 6,
      name: '수지',
      image: '/images/수지.jpg',
    },
    {
      id: 7,
      name: '송강',
      image: '/images/송강.jpg',
    },
    {
      id: 8,
      name: '천우희',
      image: '/images/천우희.jpg',
    },
    {
      id: 9,
      name: '레이첼 맥아담스',
      image: '/images/레이첼 맥아담스.jpg',
    },
  ],
};
