import PeopleList from '../../components/user/PeopleList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listActors } from '../../modules/actors';
import Loader from '../../components/common/Loader';

const ActorListContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { actors, error, loading } = useSelector(({ actors, loading }) => ({
    actors: actors.actors,
    error: actors.error,
    loading: loading['actors/LIST_ACTORS'],
  }));
  useEffect(() => {
    if (actors) return;
    dispatch(listActors({ userId }));
  }, [dispatch, userId]);

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <PeopleList
      data={actors ? actors.cast : null}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(ActorListContainer);
