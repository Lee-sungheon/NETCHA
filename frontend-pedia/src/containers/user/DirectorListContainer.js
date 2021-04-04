import ActorAndDirectorList from '../../components/user/PeopleList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listDirectors } from '../../modules/directors';

const DirectorListContainer = () => {
  const dispatch = useDispatch();
  const { userId, directors, error, loading } = useSelector(
    ({ user, directors, loading }) => ({
      userId: user.user.userId,
      directors: directors.directors,
      error: directors.error,
      loading: loading['directors/LIST_DIRECTORS'],
    })
  );
  useEffect(() => {
    dispatch(listDirectors({ userId }));
  }, [dispatch, userId]);

  return (
    <ActorAndDirectorList data={directors? directors.director : null} error={error} loading={loading} />
  );
};

export default withRouter(DirectorListContainer);
