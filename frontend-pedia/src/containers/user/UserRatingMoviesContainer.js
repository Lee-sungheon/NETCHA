import SmallSlider from "../../components/slider/SmallSlider";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listRatingMovies } from "../../modules/ratingMovies";

const UserScoreMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, movies, error, loading } = useSelector(
    ({ user, ratingMovies, loading }) => ({
      userId: user.user.userId,
      movies: ratingMovies.movies,
      error: ratingMovies.error,
      loading: loading["ratingMovies/LIST_RATING_MOVIES"],
    })
  );
  useEffect(() => {
    dispatch(listRatingMovies(userId));
  }, [dispatch, userId]);

  movies &&
    movies.forEach((movie) => {
      movie.isRating = "평가함";
    });

  return (
    <>
      <h3 style={{ display: "inline-block" }}>평가</h3>&nbsp;&nbsp;
      {movies ? movies.length : ""}
      <SmallSlider movies={movies} error={error} loading={loading} />
    </>
  );
};

export default withRouter(UserScoreMoviesContainer);
