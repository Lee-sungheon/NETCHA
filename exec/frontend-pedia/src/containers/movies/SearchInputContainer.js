import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SearchInput from "../../components/common/SearchInput";
import { listAutoCompletesMovies, initialize, changeSearchKeyword } from "../../modules/autoCompletesMovies";

export default function SearchInputContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { keyword, autoCompletesMovies, error } = useSelector(({ autoCompletesMovies }) => ({
    keyword: autoCompletesMovies.keyword,
    autoCompletesMovies : autoCompletesMovies.autoCompletesMovies,
    error: autoCompletesMovies.error,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = e => {
    dispatch(changeSearchKeyword({keyword: e.target.value}));
    dispatch(listAutoCompletesMovies(e.target.value));
  };
  
  // 검색 엔터 이벤트 핸들러
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      dispatch(initialize());
      history.push(`/searchMovie/${keyword.keyword}`);
    }
  };

  // 인풋 블러
  const onBlur = e => {
    dispatch(initialize());
  };
  
  useEffect(() => {
    return() => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <SearchInput keyword={keyword} movies={autoCompletesMovies} onChange={onChange} onKeyPress={onKeyPress} onBlur={onBlur} error={error} />;
}
