import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listZzimMovies, countZzimMovies } from '../../modules/zzimMovies';
import UserZzimMovies from '../../components/user/UserZzimMovies';
import Loader from '../../components/common/Loader';

const UserZzimMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, zzimMovies, count, error, loading } = useSelector(
    ({ user, zzimMovies, loading }) => ({
      userId: user.user.userId,
      zzimMovies: zzimMovies.movies,
      count: zzimMovies.count,
      error: zzimMovies.error,
      loading: loading['zzimMovies/LIST_ZZIM_MOVIES'],
    })
  );
  useEffect(() => {
    dispatch(listZzimMovies({ page: 0, userId }));
    dispatch(countZzimMovies(userId));
  }, [dispatch, userId]);

  if (zzimMovies) {
    for (let i = 0; i < zzimMovies.length; i++) {
      if (zzimMovies[i].userDidRank > 0) {
        zzimMovies[i].isRating = '평가함';
        zzimMovies[i].score = zzimMovies[i].userDidRank;
      } else {
        zzimMovies[i].isRating = '평균';
        zzimMovies[i].score = zzimMovies[i].avgRank;
      }
    }
  }

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <>
      <UserZzimMovies
        movies={zzimMovies}
        error={error}
        loading={loading}
        count={count}
      />
    </>
  );
};

export default withRouter(UserZzimMoviesContainer);
