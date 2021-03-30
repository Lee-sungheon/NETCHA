import React from "react";
import SearchInput from "../../components/common/SearchInput";

export default function SearchInputContainer() {
  return (
    <>
      <SearchInput movies={movies} />
    </>
  );
}

const movies = [
  "고질라 VS. 콩",
  "극장판 귀멸의 칼날 무한열차편",
  "자산어보",
  "미나리",
  "최면",
  "파이터",
  "디 아더 사이드",
  "국카스텐 콘서트 실황 : 해프닝",
  "더 박스",
  "스파이의 아내",
];
