import './MovieHeader.scss';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useEffect, useState } from 'react';
import client from '../../lib/api/client';

const MovieHeader = ({ movie, formData, setFormData }) => {
  const [isSelected, setIsSelected] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const onClickLike = () => {
    setIsSelected(!isSelected);
  };
  const updateRank = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      // setError(null);
      // loading 상태를 true 로 바꿉니다.
      // setLoading(true);
      const response = await client.post('movie/rank_update', formData);
    } catch (e) {
      // setError(e);
    }
    // setLoading(false);
  };

  const onClickRank = (e) => {
    if (e.target.name == 'size-large') {
      if (e.target.value === formData.ranking) {
        setFormData({ ...formData, ranking: 0 });
      } else {
        setFormData({ ...formData, ranking: e.target.value });
      }
    }
  };

  useEffect(() => {
    updateRank(formData);
  }, [formData]);

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
                  <div>
                    <Rating
                      name="size-large"
                      size="large"
                      precision={0.5}
                      onClick={(e) => onClickRank(e)}
                      value={formData.ranking || 0}
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
