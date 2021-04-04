import React, { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieList from "../../components/movies/SearchMovieList";
import { listSearchMovies, setPage } from "../../modules/searchMovies";
import { withRouter } from "react-router";

const SearchMovieListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { movies, page, error, loading } = useSelector(({ searchMovies, loading }) => ({
    movies: searchMovies.movies,
    page: searchMovies.page,
    error: searchMovies.error,
    loading: loading["searchMovies/LIST_SEARCH_MOVIES"],
  }));
  useEffect(() => {
    const { keyword } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log('keyword: ' + keyword);
    console.log('page: ' + page);
    dispatch(listSearchMovies({ keyword, page }));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    dispatch(setPage(page+1));
  }

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      setItemIndex(itemIndex + 100);
      setResult(movies.concat(video_list.slice(itemIndex+100, itemIndex+200)));
    }
  }, [itemIndex, result]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);







  return <SearchMovieList loading={loading} error={error} movies={movies} fetchMoreData={fetchMoreData} />;
};

export default withRouter(SearchMovieListContainer);
