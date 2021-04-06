import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readMovie, unloadMovie } from "../../modules/movie";

import "./MovieDetailContainer.scss";
import MovieHeader from "../../components/movieDetail/MovieHeader";
import BasicInfo from "../../components/movieDetail/BasicInfo";
import Cast from "../../components/movieDetail/Cast";
import StarGraph from "../../components/movieDetail/StarGraph";
import Comment from "../../components/movieDetail/comment/Comment";
import SimilarMovies from "../../components/movieDetail/SimilarMovies";
import Gallery from "../../components/movieDetail/Gallery";
import Video from "../../components/movieDetail/Video";
import WriteComment from "../../components/movieDetail/comment/WriteComment";
import MyComment from "../../components/movieDetail/comment/MyComment";

const MovieDetailContainer = ({ match }) => {
  // 처음 마운트될 때 무비 읽기 API 요청
  const { movieNo, token } = match.params;
  const dispatch = useDispatch();
  const [rankData, setRankData] = useState({ ranking: 0 });
  const [zzimData, setZzimData] = useState({ isZzim: false });
  const [myCommentData, setMyCommentData] = useState({ content: "" });

  const { movie, user, requestData, error, loading } = useSelector(
    ({ movie, user, loading }) => ({
      movie: movie.movie,
      error: movie.error,
      user: user.user,
      requestData: {
        movieNo: parseInt(match.params.movieNo),
        userId: user.user.userId,
      },
      loading: loading["movie/READ_MOVIE"],
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
        content: movie.user_review,
        title: movie.movie_info.title,
      });
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
                <Video movieNo={movieNo} />
              </div>
              <div className="contentBlock">
                <BasicInfo movie={movie} loading={loading} error={error} />
                <Cast actors={movie.movie_info.casts} />
                <StarGraph
                  movieRank={movie.movie_rank}
                  avgRank={movie.movie_info.avgRank}
                  requestData={requestData}
                  rankData={rankData}
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

export default withRouter(MovieDetailContainer);
