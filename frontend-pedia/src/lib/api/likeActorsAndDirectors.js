// import client from './client';

export const listLikeActors = ({ userId }) => {
  console.log('userId:' + userId);
  return actors;
  // return client.get(`/actors/${userId}`)
};

export const listLikeDirectors = ({ userId }) => {
  console.log('userId:' + userId);
  return directors;
  // return client.get(`/directors/${userId}`)
};

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
