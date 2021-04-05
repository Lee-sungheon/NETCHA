import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listNewMovies } from "../../modules/newMovies";
import MovieRanking from "../../components/movies/MovieRanking";
import Loader from '../../components/common/Loader';

const NewMovieContainer = ({title}) => {
  const dispatch = useDispatch();
  const { user, newMovies, error, loading } = useSelector(({ user, newMovies, loading }) => ({
    user: user.user,
    newMovies: newMovies.newMovies,
    error: newMovies.error,
    loading: loading["newMovies/LIST_NEW_MOVIES"],
  }));
  useEffect(() => {
    dispatch(listNewMovies(user ? user.userId : -1));
  }, [dispatch, user]);

  if (loading) return <Loader type="spin" color="#ff0073" message="LOADING..." />;
  
  return (
    <MovieRanking title={title} loading={loading} error={error} movies={newMovies} />
  );
};

export default withRouter(NewMovieContainer);
