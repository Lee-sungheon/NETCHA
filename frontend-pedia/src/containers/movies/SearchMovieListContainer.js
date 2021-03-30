import React from "react";
import SearchMovieList from "../../components/movies/SearchMovieList";

export default function SearchMovieListContainer({ keyword, movies }) {
  return (
    <SearchMovieList data={movies} />
  );
}

const movies = [
  {
    id: 1,
    image: "/images/1.jpg",
    title: "고질라 VS. 콩",
  },
  {
    id: 2,
    image: "/images/2.jpg",
    title: "극장판 귀멸의 칼날 무한열차편",
  },
  {
    id: 3,
    image: "/images/3.jpg",
    title: "자산어보",
  },
  {
    id: 4,
    image: "/images/4.jpg",
    title: "미나리",
  },
  {
    id: 5,
    image: "/images/5.jpg",
    title: "최면",
  },
  {
    id: 6,
    image: "/images/6.jpg",
    title: "파이터",
  },
  {
    id: 7,
    image: "/images/7.jpg",
    title: "디 아더 사이드",
  },
  {
    id: 8,
    image: "/images/8.jpg",
    title: "국카스텐 콘서트 실황 : 해프닝",
  },
  {
    id: 9,
    image: "/images/9.jpg",
    title: "더 박스",
  },
  {
    id: 10,
    image: "/images/10.jpg",
    title: "스파이의 아내",
  },
];
