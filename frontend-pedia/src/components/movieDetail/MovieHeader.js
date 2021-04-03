import './MovieHeader.scss';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import * as rankApi from '../../lib/api/rank';
import * as moviesApi from '../../lib/api/movies';

const MovieHeader = ({
  movie,
  rankData,
  setRankData,
  zzimData,
  setZzimData,
}) => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const updateZzim = async () => {
    if (zzimData.isZzim == false) {
      try {
        await moviesApi.updateZzimMovies(zzimData);
      } catch (e) {}
    } else {
      try {
        await moviesApi.deleteZzimMovies(zzimData);
      } catch (e) {}
    }
    setZzimData({ ...zzimData, isZzim: !zzimData.isZzim });
  };

  const updateRank = async (e) => {
    let tempRanking = 0;
    if (e.target.value == rankData.ranking) {
      tempRanking = 0;
    } else {
      tempRanking = parseFloat(e.target.value);
    }
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      // setError(null);
      // loading 상태를 true 로 바꿉니다.
      // setLoading(true);
      const response = rankApi.updateRank({
        ...rankData,
        ranking: tempRanking,
      });
      setRankData({ ...rankData, ranking: tempRanking });
    } catch (e) {
      // setError(e);
    }
    // setLoading(false);
  };

  const onClickZzim = () => {
    updateZzim();
  };

  const onClickRank = (e) => {
    if (e.target.name == 'size-large') {
      updateRank(e);
    }
  };

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
                <div className="buttonContainer" onClick={onClickZzim}>
                  <button className={!zzimData.isZzim ? 'zzim' : 'unZzim'}>
                    {!zzimData.isZzim && (
                      <div className="plusIcon">
                        <AddIcon style={{ fontSize: '30px' }} />
                      </div>
                    )}
                    {zzimData.isZzim && (
                      <div className="plusIcon">
                        <BookmarksIcon className="bookmark" />
                      </div>
                    )}
                    보고싶어요
                  </button>
                  <button
                    className={
                      zzimData.isZzim
                        ? 'unZzimModalBtnWrapper'
                        : 'modalBtnWrapper'
                    }
                  ></button>
                </div>
                <div className="starRatingBox">
                  평가하기
                  <div>
                    <Rating
                      name="size-large"
                      size="large"
                      precision={0.5}
                      onClick={(e) => onClickRank(e)}
                      value={rankData.ranking || 0}
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
