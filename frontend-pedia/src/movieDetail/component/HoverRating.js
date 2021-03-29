import React, { useMemo } from 'react';
import './HoverRating.scss';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function HoverRating(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;

  const fillColor = useMemo(() => {
    if (hoverRating >= index) {
      return '#ffdb58'; // #ffdb58 === 노란색
    } else if (!hoverRating && rating >= index) {
      return '#ffdb58'; // #ffdb58 === 노란색
    }
    return '#dcdcdc'; // #dcdcdc === 회색
  }, [rating, hoverRating, index]);

  return (
    <>
      <StarBorderIcon />
    </>
  );
}
