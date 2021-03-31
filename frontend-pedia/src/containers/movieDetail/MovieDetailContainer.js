import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readMovie, unloadMovie } from '../../modules/movie';

import './MovieDetailContainer.scss';
import MovieHeader from '../../components/movieDetail/MovieHeader';
import BasicInfo from '../../components/movieDetail/BasicInfo';
import Actors from '../../components/movieDetail/Actors';
import StarGraph from '../../components/movieDetail/StarGraph';
import Comment from '../../components/movieDetail/Comment/Comment';
import SimilarMovies from '../../components/movieDetail/SimilarMovies';
import Gallery from '../../components/movieDetail/Gallery';
import Video from '../../components/movieDetail/Video';

const MovieDetailContainer = ({ match }) => {
  // 처음 마운트될 때 무비 읽기 API 요청
  const { movieId } = match.params;
  const dispatch = useDispatch();
  const { movie, error, loading } = useSelector(({ movie, loading }) => ({
    movie: movie.movie,
    error: movie.error,
    loading: loading['movie/READ_MOVIE'],
  }));

  useEffect(() => {
    dispatch(readMovie(movieId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadMovie());
    };
  }, [dispatch, movieId]);

  return (
    <div className="movieDetail">
      <div className="headerWrapper">
        {/* 영화 이미지, 포스터, 제목, 장르 별점 */}
        <MovieHeader movie={movie} loading={loading} error={error} />
      </div>
      <div className="contentWrapper">
        <div className="contentBox">
          <BasicInfo movie={movie} loading={loading} error={error} />
          <Actors />
          <StarGraph />
          <Comment />
          <SimilarMovies />
        </div>
        <div className="sideBox">
          <Gallery />
          <Video />
        </div>
      </div>
    </div>
  );
};

export default withRouter(MovieDetailContainer);
