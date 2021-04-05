import SmallSlider from "../../components/slider/SmallSlider";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listZzimMovies } from "../../modules/zzimMovies";
import UserZzimMovies from "../../components/user/UserZzimMovies";
import SeeMoreButton from '../../components/common/SeeMoreButton';

const UserZzimMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, zzimMovies, ratingMovies, error, loading } = useSelector(
    ({ user, zzimMovies, ratingMovies, loading }) => ({
      userId: user.user.userId,
      ratingMovies: ratingMovies.movies,
      zzimMovies: zzimMovies.movies,
      error: zzimMovies.error,
      loading: loading["zzimMovies/LIST_ZZIM_MOVIES"],
    })
  );
  useEffect(() => {
    dispatch(listZzimMovies({page: 0, userId}));
  }, [dispatch, userId]);

  if (zzimMovies && ratingMovies) {
    for (let i = 0; i < zzimMovies.length; i++) {
      for (let j = 0; j < ratingMovies.length; j++) {
        if (zzimMovies[i].no === ratingMovies[j].no) {
          zzimMovies[i].isRating = "평가함";
          break;
        }
      }
    }
    zzimMovies.forEach((movie) => {
      if (!movie.isRating) movie.isRating = "평균";
    });
  }

  const count = zzimMovies ? zzimMovies.length : '';

  return (
    <>
      {/* <UserZzimMovies moviess={zzimMovies} error={error} loading={loading} count={count} /> */}
      <h3 style={{ display: 'inline-block' }}>보고싶어요</h3>&nbsp;&nbsp;{count}
      <SeeMoreButton link="/userZzimMoviesList" />
      <SmallSlider movies={zzimMovies} error={error} loading={loading} />
    </>
  );
};

export default withRouter(UserZzimMoviesContainer);
