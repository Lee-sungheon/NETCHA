import PeopleList from "../../components/user/PeopleList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listActors } from "../../modules/actors";

const ActorListContainer = () => {
  const dispatch = useDispatch();
  const { userId, actors, error, loading } = useSelector(({ user, actors, loading }) => ({
    userId: user.user.userId,
    actors: actors.actors,
    error: actors.error,
    loading: loading["actors/LIST_ACTORS"],
  }));
  useEffect(() => {
    dispatch(listActors({ userId }));
  }, [dispatch, userId]);

  return (
    <PeopleList data={actors} error={error} loading={loading} />
  );
};

export default withRouter(ActorListContainer);
