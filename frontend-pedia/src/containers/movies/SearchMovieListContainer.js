import React, { useEffect, useState, useCallback } from 'react';
import MovieList from '../../components/movies/MovieList';
import { withRouter } from 'react-router';
import * as moviesApi from '../../lib/api/movies';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from "../../modules/autoCompletesMovies";

const SearchMovieListContainer = ({ location, keyword }) => {
  const dispatch = useDispatch();

  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const { userId } = useSelector(({ user }) => ({
    userId: user.user.userId
  }));

  const initSearchMovies = async () => {
    setLoading(true);
    const response = await moviesApi.listSearchMovies({ page, keyword, userId });
    
    setMovies(response.data);
    
    setLoading(false);
  };

  const getSearchMovies = async (newPage) => {
    setLoading(true);
    const response = await moviesApi.listSearchMovies({ page: newPage, keyword, userId });
    
    if(response.data.length === 0) {
      setStop(true);
      setLoading(false);
      return;
    }
      setMovies(movies.concat(...response.data));
      
    setLoading(false);
  };

  useEffect(() => {
    dispatch(initialize());
    initSearchMovies();
  }, [keyword]);

  const _infiniteScroll = useCallback(() => {
    if(stop) return;
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    
    if(scrollTop + clientHeight === scrollHeight) {
      setPage(page+1);
      getSearchMovies(page+1);
    }
  }, [page, movies]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <>
      <MovieList movies={movies} headerTitle="영화 검색 결과" />
      {loading && <img src="/images/Rolling-50px.svg" style={{marginLeft: "50%"}}/>}
      <button style={{color: "white", backgroundColor: "white"}}>무한스크롤</button>
    </>
  );
};

export default withRouter(SearchMovieListContainer);
