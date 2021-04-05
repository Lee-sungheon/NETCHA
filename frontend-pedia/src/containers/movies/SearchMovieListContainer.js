import React, { useEffect, useState, useCallback } from 'react';
import qs from 'qs';
import MovieList from '../../components/movies/MovieList';
import { withRouter } from 'react-router';
import * as moviesApi from '../../lib/api/movies';

const SearchMovieListContainer = ({ location }) => {
  // const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState(null);
  const { keyword } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getSearchMovies = async (newPage) => {
    try {
      const response = await moviesApi.listSearchMovies({ keyword, page: newPage });
      if (movies) {
        setMovies([...movies, ...response.data]);
      }
      else {
        setMovies(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSearchMovies(page);
  }, []);

  /*
  const { movies, page, error, loading } = useSelector(
    ({ searchMovies, loading }) => ({
      movies: searchMovies.movies,
      page: searchMovies.page,
      error: searchMovies.error,
      loading: loading['searchMovies/LIST_SEARCH_MOVIES'],
    })
  );

  useEffect(() => {
    const { keyword } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log('keyword: ' + keyword);
    console.log('page: ' + page);
    dispatch(listSearchMovies({ keyword, page }));
  }, []);
  // }, [dispatch, page]);

  */
  
  const _infiniteScroll = useCallback(() => {
    console.log('scroll');
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    
    if(scrollTop + clientHeight === scrollHeight) {
      console.log('fetchMore');
      setPage(page + 1);
      setMovies(movies.concat(getSearchMovies(page+1)));
    }
  }, [page, movies]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <>
      {/* <SearchMovieList loading={loading} error={error} movies={movies} /> */}
      <MovieList movies={movies} />
      <button>무한스크롤</button>
    </>
  );
};

export default withRouter(SearchMovieListContainer);
