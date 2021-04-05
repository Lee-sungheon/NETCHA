import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listNetChaRankingMovies } from "../../modules/netchaRankingMovies";
import MovieRanking from "../../components/movies/MovieRanking";
import Loader from '../../components/common/Loader';

const MovieRankingContainer = ({title}) => {
  const dispatch = useDispatch();
  const { user, movies, error, loading } = useSelector(({ user, netchaRankingMovies, loading }) => ({
    user: user.user,
    movies: netchaRankingMovies.movies,
    error: netchaRankingMovies.error,
    loading: loading["netchaRankingMovies/NETCHA_RANKING_MOVIES"],
  }));
  useEffect(() => {
    dispatch(listNetChaRankingMovies(user ? user.userId : -1));
  }, [dispatch, user]);

  if (loading) return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <MovieRanking title={title} loading={loading} error={error} movies={movies} />
  );
};

export default withRouter(MovieRankingContainer);
