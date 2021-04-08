import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listStars } from '../../modules/stars';
import StarGraph from '../../components/user/StarGraph';
import Loader from '../../components/common/Loader';

var highestStar = 0,
  sum = 0,
  calc = 0.0,
  score = 0,
  avg = 0;

function getValues(arr) {
  var max = 0;
  sum = 0;
  calc = 0.0;
  score = 0;
  for (let i = 0; i < arr.length; i++) {
    score += 0.5;
    sum += arr[i];
    calc += score * arr[i];
    if (max < arr[i]) {
      max = arr[i];
      highestStar = score;
    }
  }

  if (sum === 0) avg = 0.0;
  else avg = calc / sum;
}

const StarGraphContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { stars, error, loading } = useSelector(({ stars, loading }) => ({
    stars: stars.stars,
    error: stars.error,
    loading: loading['stars/LIST_STARS'],
  }));
  useEffect(() => {
    dispatch(listStars({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (stars !== null) getValues(stars);
  }, [dispatch, stars]);

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <StarGraph
      stars={stars}
      sum={sum}
      avg={avg.toFixed(1)}
      max={highestStar}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(StarGraphContainer);
