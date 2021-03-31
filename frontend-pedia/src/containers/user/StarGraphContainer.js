import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listStars } from '../../modules/stars';
import StarGraph from '../../components/user/StarGraph';

var highestStar = 0,
  sum = 0,
  calc = 0.0,
  score = 0,
  avg = 0;
function getValues(arr) {
  console.log('여기는 arr');
  console.log(arr);
  var max = 0;
  for (let i = 0; i < arr.length; i++) {
    score += 0.5;
    sum += arr[i];
    calc += score * arr[i];
    if (max < arr[i]) {
      max = arr[i];
      highestStar = score;
    }
  }

  avg = calc / sum;
}

const StarGraphContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { stars, error, loading } = useSelector(({ stars, loading }) => ({
    stars: stars.stars,
    error: stars.error,
    loading: loading['stars/LIST_STARS'],
  }));
  useEffect(() => {
    dispatch(listStars({ userId }));
    console.log('stars: ' + stars);
    getValues(stars);
  }, [dispatch]);

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
