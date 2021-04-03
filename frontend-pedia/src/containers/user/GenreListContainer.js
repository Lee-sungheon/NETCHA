import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CountryAndGenreList from "../../components/user/CountryAndGenreList";
import { listGenres } from "../../modules/genres";

const GenreListContainer = () => {
  const dispatch = useDispatch();
  const { userId, genres, error, loading } = useSelector(({ user, genres, loading }) => ({
    userId: user.user.userId,
    genres: genres.genres,
    error: genres.error,
    loading: loading["genres/LIST_GENRES"],
  }));
  useEffect(() => {
    dispatch(listGenres({ userId }));
  }, [dispatch, userId]);
  return (
    <CountryAndGenreList data={genres} error={error} loading={loading} />
  );
};

export default withRouter(GenreListContainer);

