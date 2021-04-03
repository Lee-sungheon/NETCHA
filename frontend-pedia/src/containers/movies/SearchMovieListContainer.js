import React, { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieList from "../../components/movies/SearchMovieList";
import { listSearchMovies } from "../../modules/searchMovies";
import { withRouter } from "react-router";

const SearchMovieListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { movies, error, loading } = useSelector(({ searchMovies, loading }) => ({
    movies: searchMovies.movies,
    error: searchMovies.error,
    loading: loading["searchMovies/LIST_SEARCH_MOVIES"],
  }));
  useEffect(() => {
    const { keyword, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log('keyword: ' + keyword);
    console.log('page: ' + page);
    dispatch(listSearchMovies({ keyword, page }));
  }, [dispatch, location.search]);

  return <SearchMovieList loading={loading} error={error} movies={movies} />;
};

export default withRouter(SearchMovieListContainer);
