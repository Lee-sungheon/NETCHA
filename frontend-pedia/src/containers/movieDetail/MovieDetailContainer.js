import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readMovie, unloadMovie } from '../../modules/movie';

import './MovieDetailContainer.scss';
import MovieHeader from '../../components/movieDetail/MovieHeader';
import BasicInfo from '../../components/movieDetail/BasicInfo';
import Cast from '../../components/movieDetail/Cast';
import StarGraph from '../../components/movieDetail/StarGraph';
import Comment from '../../components/movieDetail/Comment/Comment';
import SimilarMovies from '../../components/movieDetail/SimilarMovies';
import Gallery from '../../components/movieDetail/Gallery';
import Video from '../../components/movieDetail/Video';
import WriteComment from '../../components/movieDetail/Comment/WriteComment';
import MyComment from '../../components/movieDetail/Comment/MyComment';

const MovieDetailContainer = ({ match }) => {
  // 처음 마운트될 때 무비 읽기 API 요청
  const { movieNo } = match.params;
  const dispatch = useDispatch();
  const [rankData, setRankData] = useState({ ranking: 0 });
  const [zzimData, setZzimData] = useState({ isZzim: false });
  const [myCommentData, setMyCommentData] = useState({ content: '' });

  const { movie, user, requestData, error, loading } = useSelector(
    ({ movie, user, loading }) => ({
      movie: movie.movie,
      error: movie.error,
      user: user.user,
      requestData: {
        movieNo: match.params.movieNo,
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
    }
  }, [movie]);

  // ranking: null,
  // isZzim: false,
  // content: '',

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
                <Video />
              </div>
              <div className="contentBlock">
                <BasicInfo movie={movie} loading={loading} error={error} />
                <Cast actors={movie.movie_info.casts} />
                <StarGraph
                  movieRank={movie.movie_rank}
                  avgRank={movie.movie_info.avgRank}
                />
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

const actors = [
  { id: 1, name: 'sdfsw', role: '감독' },
  { id: 2, name: '이상진', role: '배우' },
  { id: 3, name: 'sdfsw', role: '감독' },
  { id: 4, name: '이상진', role: '배우' },
  { id: 5, name: 'sdfsw', role: '감독' },
  { id: 6, name: '이상진', role: '배우' },
  { id: 7, name: 'sdfsw', role: '감독' },
  { id: 8, name: '이상진', role: '배우' },
];

const imgs = [
  {
    id: 1,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 3,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 4,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 5,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 6,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
];

export default withRouter(MovieDetailContainer);
