import React from 'react';
import { ReactComponent as StarSvg } from '../../images/review_star_full.svg';
// svg를 이미지 폴더 안에 있는 파일로 저장했다는 가정하에 import.

const StarIcon = ({ fillColor = '#dcdcdc' }) => {
  return (
    <div>
      <StarSvg style={{ marginRight: '3px' }} fill={fillColor} />
    </div>
  );
};

export default StarIcon;
