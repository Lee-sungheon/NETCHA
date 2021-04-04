import React, { useEffect, useState } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieList from "../../components/movies/SearchMovieList";
import { listSearchMovies, setPage } from "../../modules/searchMovies";
import { withRouter } from "react-router";

const SearchMovieListContainer = ({ location }) => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  // const [movies, setMovies] = useState(null);

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
    dispatch(listSearchMovies({ keyword, page }));
  }

  return <SearchMovieList loading={loading} error={error} movies={movies} fetchMoreData={fetchMoreData} />;
};

export default withRouter(SearchMovieListContainer);
