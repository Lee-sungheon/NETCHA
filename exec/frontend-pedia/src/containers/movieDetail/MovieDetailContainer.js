import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicInfo from '../../components/movieDetail/BasicInfo';
import Cast from '../../components/movieDetail/Cast';
import Comment from '../../components/movieDetail/Comment/Comment';
import MyComment from '../../components/movieDetail/Comment/MyComment';
import WriteComment from '../../components/movieDetail/Comment/WriteComment';
import Gallery from '../../components/movieDetail/Gallery';
import MovieHeader from '../../components/movieDetail/MovieHeader';
import SimilarMovies from '../../components/movieDetail/SimilarMovies';
import StarGraph from '../../components/movieDetail/StarGraph';
import Video from '../../components/movieDetail/Video';
import { readMovie, unloadMovie } from '../../modules/movie';
import './MovieDetailContainer.scss';
import Loader from '../../components/common/Loader';

const MovieDetailContainer = ({ movieNo }) => {
  const dispatch = useDispatch();

  // 처음 마운트될 때 무비 읽기 API 요청

  const [rankData, setRankData] = useState({ ranking: 0 });
  const [zzimData, setZzimData] = useState({ isZzim: false });
  const [myCommentData, setMyCommentData] = useState({ content: '' });

  const { movie, user, requestData, error, loading } = useSelector(
    ({ movie, user, loading }) => ({
      movie: movie.movie,
      error: movie.error,
      user: user.user,
      requestData: {
        movieNo: movieNo,
        userId: user.user.userId,
      },
      loading: loading['movie/READ_MOVIE'],
    })
  );
  useEffect(() => {
    if (requestData.movieNo && requestData.userId)
      dispatch(readMovie(requestData));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadMovie());
    };
  }, [dispatch, movieNo]);

  useEffect(() => {
    if (movie) {
      setRankData({ ranking: movie.user_rank });
      setZzimData({ isZzim: movie.movie_info.userDidZzim });
      setMyCommentData({
        title: movie.movie_info.title,
        content: movie.user_review,
      });
    }
  }, [movie]);
  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;
  return (
    <>
      {movie && (
        <div className="movieDetail">
          <div className="headerWrapper">
            {/* 영화 이미지, 포스터, 제목, 장르 별점 */}
            <MovieHeader
              movie={movie}
              rankData={rankData}
              requestData={requestData}
              setRankData={setRankData}
              zzimData={zzimData}
              setZzimData={setZzimData}
              loading={loading}
              error={error}
            />
          </div>
          <div className="contentWrapper">
            <div className="contentBox">
              {!myCommentData.content &&
                rankData.ranking !== -1 &&
                rankData.ranking !== 0 && (
                  <div className="commentWrapper">
                    <WriteComment
                      requestData={requestData}
                      myCommentData={myCommentData}
                      setMyCommentData={setMyCommentData}
                      nickname={user.username}
                    />
                  </div>
                )}
              {myCommentData.content && (
                <div className="myCommentWrapper">
                  <MyComment
                    requestData={requestData}
                    myCommentData={myCommentData}
                    setMyCommentData={setMyCommentData}
                  />
                </div>
              )}
              <div className="sideBlock">
                <Gallery imgs={movie.movie_info.imageUrl} />
                <Video movieNo={movieNo} movieTitle={movie.movie_info.title} />
              </div>
              <div className="contentBlock">
                <BasicInfo movie={movie} loading={loading} error={error} />
                <Cast people={movie.actors} actors={movie.movie_info.casts} />
                <StarGraph requestData={requestData} />
                <Comment
                  requestData={requestData}
                  myCommentData={myCommentData}
                />
                <SimilarMovies requestData={requestData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailContainer;
