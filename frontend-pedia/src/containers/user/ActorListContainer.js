import ActorAndDirectorList from "../../components/user/ActorAndDirectorList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listActors } from "../../modules/actors";

const ActorListContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { actors, error, loading } = useSelector(({ actors, loading }) => ({
    actors: actors.actors,
    error: actors.error,
    loading: loading["actors/LIST_ACTORS"],
  }));
  useEffect(() => {
    dispatch(listActors({ userId }));
  }, [dispatch]);

  return (
    <ActorAndDirectorList data={actors} error={error} loading={loading} />
  );
};

export default withRouter(ActorListContainer);
