import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import GenreList from "../../components/user/GenreList";
import { listGenres } from "../../modules/genres";
import Loader from '../../components/common/Loader';

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

  if (loading) return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <GenreList data={genres} error={error} loading={loading} />
  );
};

export default withRouter(GenreListContainer);

