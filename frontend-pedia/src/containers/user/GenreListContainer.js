import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CountryAndGenreList from "../../components/user/CountryAndGenreList";
import { listGenres } from "../../modules/genres";

const GenreListContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { genres, error, loading } = useSelector(({ genres, loading }) => ({
    genres: genres.genres,
    error: genres.error,
    loading: loading["genres/LIST_GENRES"],
  }));
  useEffect(() => {
    dispatch(listGenres({ userId }));
  }, [dispatch]);
  return (
    <CountryAndGenreList data={genres} error={error} loading={loading} />
  );
};

export default withRouter(GenreListContainer);

