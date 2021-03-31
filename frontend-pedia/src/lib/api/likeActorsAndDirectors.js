// import client from './client';

export const listLikeActors = ({ userId }) => {
  console.log("userId:" + userId);
  return actors;
  // return client.get(`/actors/${userId}`)
};

export const listLikeDirectors = ({ userId }) => {
  console.log("userId:" + userId);
  return directors;
  // return client.get(`/directors/${userId}`)
};

const directors = {
  data: [
    {
      id: 1,
      name: "감독이다",
    },
    {
      id: 2,
      name: "감독이다",
    },
    {
      id: 3,
      name: "감독이다",
    },
    {
      id: 4,
      name: "감독이다",
    },
    {
      id: 5,
      name: "감독이다",
    },
    {
      id: 6,
      name: "감독이다",
    },
    {
      id: 7,
      name: "감독이다",
    },
    {
      id: 8,
      name: "감독이다",
    },
    {
      id: 9,
      name: "감독이다",
    },
  ]
};

const actors = {
  data: [
    {
      id: 1,
      name: "임시완",
    },
    {
      id: 2,
      name: "박규영",
    },
    {
      id: 3,
      name: "이도현",
    },
    {
      id: 4,
      name: "한예리",
    },
    {
      id: 5,
      name: "신세경",
    },
    {
      id: 6,
      name: "수지",
    },
    {
      id: 7,
      name: "송강",
    },
    {
      id: 8,
      name: "천우희",
    },
    {
      id: 9,
      name: "레이첼 맥아담스",
    },
  ],
};
