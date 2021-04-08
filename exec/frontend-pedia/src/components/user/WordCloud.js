import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const options = {
  colors: ['rgb(255, 47, 110)'],
  fontStyle: 'Noto Sans KR',
  fontSizes: [15, 30],
  fontWeight: 'bold',
  padding: 25,
  enableTooltip: false,
  deterministic: false,
  rotations: 0,
  rotationAngles: [0, 0],
  transitionDuration: 1000,
};

const Wordcloud = ({ tags, error, loading }) => {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  return (
    <>{!loading && tags && <ReactWordcloud options={options} words={tags} />}</>
  );
};

export default Wordcloud;
