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
  requestData,
  zzimData,
  setZzimData,
}) => {
  const updateZzim = async () => {
    if (zzimData.isZzim === false) {
      try {
        await moviesApi.updateZzimMovies(requestData);
      } catch (e) {}
    } else {
      try {
        await moviesApi.deleteZzimMovies(requestData);
      } catch (e) {}
    }
    setZzimData({ isZzim: !zzimData.isZzim });
  };
  let sumRank = 0;
  for (let key in movie.movie_rank) {
    sumRank += movie.movie_rank[key];
  }

  const updateRank = async (e) => {
    let tempRanking = 0;
    try {
      if (parseFloat(e.target.value) === rankData.ranking) {
        tempRanking = 0;
        rankApi.deleteRank(requestData);
      } else {
        tempRanking = parseFloat(e.target.value);
        rankApi.updateRank({
          ...requestData,
          ranking: tempRanking,
        });
      }
      setRankData({ ranking: tempRanking });
    } catch (e) {}
  };
  const onClickZzim = () => {
    updateZzim();
  };

  const onClickRank = (e) => {
    if (e.target.name === 'size-large') {
      updateRank(e);
    }
  };
  return (
    <div className="MovieHeaderWrapper">
      <div className="MovieHeaderTop">
        <img
          className="posterImgg"
          alt="banner"
          src={
            movie.movie_info.imageUrl === 'default'
              ? '../../images/defaultPoster.png'
              : movie.movie_info.imageUrl[0]
          }
        ></img>
      </div>

      <div className="MovieHeaderBottom">
        <div className="posterImg">
          <img
            alt="poster"
            src={
              movie.movie_info.posterUrl === 'default'
                ? '../../images/defaultPoster.png'
                : movie.movie_info.posterUrl
            }
          ></img>
          <div className="posterDetail">
            <div className="posterTitle">
              {movie.movie_info.title}
              <div className="posterTitleDetail">
                {movie.movie_info.open} {movie.movie_info.ganre}{' '}
                {movie.movie_info.country}
              </div>
            </div>

            <div className="posterBottom">
              <div className="averageScore">
                평균 ★{movie.movie_info.avgRank} ({sumRank}
                명)
              </div>
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
