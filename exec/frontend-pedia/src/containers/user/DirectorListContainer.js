import PeopleList from '../../components/user/PeopleList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listDirectors } from '../../modules/directors';
import Loader from '../../components/common/Loader';

const DirectorListContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { directors, error, loading } = useSelector(
    ({ directors, loading }) => ({
      directors: directors.directors,
      error: directors.error,
      loading: loading['directors/LIST_DIRECTORS'],
    })
  );
  useEffect(() => {
    dispatch(listDirectors({ userId }));
  }, [dispatch, userId]);

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <PeopleList
      data={directors ? directors.director : null}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(DirectorListContainer);
