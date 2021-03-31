import ActorAndDirectorList from "../../components/user/ActorAndDirectorList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listDirectors } from "../../modules/directors";

const DirectorListContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { directors, error, loading } = useSelector(({ directors, loading }) => ({
      directors: directors.directors,
      error: directors.error,
      loading: loading["directors/LIST_DIRECTORS"],
    })
  );
  useEffect(() => {
    dispatch(listDirectors({ userId }));
  }, [dispatch]);

  console.log("directors: " + directors);
  return (
    <ActorAndDirectorList
      data={directors}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(DirectorListContainer);
