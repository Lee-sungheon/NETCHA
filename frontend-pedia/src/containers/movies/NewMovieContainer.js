import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listNewMovies } from "../../modules/newMovies";
import MovieRanking from "../../components/movies/MovieRanking";

const NewMovieContainer = ({title}) => {
  const dispatch = useDispatch();
  const { user, newMovies, error, loading } = useSelector(({ user, newMovies, loading }) => ({
    user: user.user,
    newMovies: newMovies.newMovies,
    error: newMovies.error,
    loading: loading["newMovies/LIST_NEW_MOVIES"],
  }));
  useEffect(() => {
    dispatch(listNewMovies());
  }, [dispatch]);

  return (
    <MovieRanking user={user} title={title} loading={loading} error={error} movies={newMovies} />
  );
};

export default withRouter(NewMovieContainer);
