import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../../components/movies/MovieList';
import { withRouter } from 'react-router';
import * as moviesApi from '../../lib/api/movies';

const UserRatingMoviesListContainer = () => {
  const dispatch = useDispatch();

  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const { userId } = useSelector(({ user }) => ({
    userId: user.user.userId,
  }));

  const initUserRatingMovies = async () => {
    setLoading(true);
    const response = await moviesApi.listRatingMovies({ page, userId });

    setMovies(response.data);

    setLoading(false);
  };

  const getUserRatingMovies = async (newPage) => {
    setLoading(true);
    const response = await moviesApi.listRatingMovies({
      page: newPage,
      userId,
    });

    if (response.data.length === 0) {
      setStop(true);
      setLoading(false);
      return;
    }
    setMovies(movies.concat(...response.data));

    setLoading(false);
  };

  useEffect(() => {
    initUserRatingMovies();
  }, [userId]);

  const _infiniteScroll = useCallback(() => {
    if (stop) return;
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setPage(page + 1);
      getUserRatingMovies(page + 1);
    }
  }, [page, movies]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <>
      <MovieList movies={movies} headerTitle="평가한 영화" />
      <button style={{ color: 'white', backgroundColor: 'white' }}>
        무한스크롤
      </button>
    </>
  );
};

export default withRouter(UserRatingMoviesListContainer);
