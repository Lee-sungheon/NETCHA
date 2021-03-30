import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/common/SearchInput";
import { initializeInput } from "../../modules/movies";

export default function SearchInputContainer() {
  const dispatch = useDispatch();
  const keyword = useSelector(({movies}) => ({
    keyword: movies.keyword
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = e => {
    const {value} = e.target;
    dispatch(
      changeSearchKeyword({
        keyword: value
      })
    )
  }

  // 검색 엔터 이벤트 핸들러
  const onKeyPress = e => {
    if(e.key === 'Enter'){
      onSubmit();
    }
  };

  useEffect(() => {
    dispatch(initializeInput(''));
  }, [dispatch]);

  return (
    <>
      <SearchInput movies={movies} keyword={keyword} onChange={onChange} onKeyPress={onKeyPress} />
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
