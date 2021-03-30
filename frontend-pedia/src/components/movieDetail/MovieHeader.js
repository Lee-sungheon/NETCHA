import './MovieHeader.scss';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useState } from 'react';

const MovieHeader = ({ movie }) => {
  const [isFinish, setIsFinish] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [score, setScore] = useState(0);
  let tmpScore = 0;
  function setHover() {
    if (isFinish) {
      setIsHover(true);
    } else {
      setIsHover(false);
      setScore(5);
    }
  }
  function onChange(e, v) {
    if (v > 0) {
      tmpScore = v;
    }
  }

  const onClickLike = () => {
    setIsSelected(!isSelected);
  };

  function onClick(e) {
    if (e.target.name !== 'size-large') {
      setIsFinish(true);
      if (tmpScore === score) {
        setIsFinish(false);
      }
      setScore(tmpScore);
    }
  }
  return (
    <div className="MovieHeaderWrapper">
      <div className="MovieHeaderTop">
        <img src="https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_720,q_80,w_1280/v1576818817/ob8puocgokh3yj7thpdt.jpg"></img>
      </div>

      <div className="MovieHeaderBottom">
        <div className="posterImg">
          <img src="https://an2-img.amz.wtchn.net/image/v2/1a5dc00efec3b2d32c0836e35f630250.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKaVlXTnJaM0p2ZFc1a0lqcDdJbklpT2pJMU5Td2laeUk2TWpVMUxDSmlJam95TlRWOUxDSmpjbTl3SWpwMGNuVmxMQ0pvWldsbmFIUWlPalF3TUN3aWNHRjBhQ0k2SWk5Mk1pOXpkRzl5WlM5cGJXRm5aUzh4TmpFek16YzNOakF6TkRRME9EZzROemcwSWl3aWNYVmhiR2wwZVNJNk9EQXNJbmRwWkhSb0lqb3lPREI5LklNVE5ocjVRNV9kTm1BblBpemx5OUJqRHZOU19xQzBpWXM0X2dlUU9BS3c"></img>
          <div className="posterDetail">
            <div className="posterTitle">
              {movie && movie.title}
              <div className="posterTitleDetail">2019 드라마 미국 프랑스</div>
            </div>

            <div className="posterBottom">
              <div className="averageScore">평균 ★3.0 (3292명)</div>
              <div className="ratingContent">
                <div className="buttonContainer" onClick={onClickLike}>
                  <button className={isSelected ? 'like' : 'unLike'}>
                    {isSelected && (
                      <div className="plusIcon">
                        <AddIcon style={{ fontSize: '30px' }} />
                      </div>
                    )}
                    {!isSelected && (
                      <div className="plusIcon">
                        <BookmarksIcon className="bookmark" />
                      </div>
                    )}
                    보고싶어요
                  </button>
                  <button
                    className={
                      isSelected ? 'modalBtnWrapper' : 'unLikeModalBtnWrapper'
                    }
                  >
                    <div className="modalBtn">▾</div>
                  </button>
                </div>
                <div className="starRatingBox">
                  평가하기
                  <div onClick={onClick}>
                    <Rating
                      name="size-large"
                      size="large"
                      precision={0.5}
                      onChangeActive={onChange}
                      value={score}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={false ? '' : 'displayNone'}></div>
    </div>
  );
};

export default MovieHeader;
