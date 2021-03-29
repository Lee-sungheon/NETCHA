import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import movie, {readMovie, unloadMovie} from '../../modules/movie';

import './MovieDetailContainer.scss';
import MovieHeader from '../../components/movieDetail/MovieHeader'
import BasicInfo from '../../components/movieDetail/BasicInfo'
import Actors from '../../components/movieDetail/Actors'
import StarGraph from '../../components/movieDetail/StarGraph'
import Comment from '../../components/movieDetail/Comment/Comment'
import SimilarMovies from '../../components/movieDetail/SimilarMovies'
import Gallery from '../../components/movieDetail/Gallery'
import Video from '../../components/movieDetail/Video'


const MovieDetailContainer = ({match}) => {
  // 처음 마운트될 때 무비 읽기 API 요청
  const { movieId } = match.params;
  console.log(movieId);
  const dispatch = useDispatch();
  const {movie, error, loading } = useSelector(({moive, loading}) => ({
    movie: movie.movie,
    error: movie.error,
    loading: loading['movie/READ_MOVIE'],
  })) ;
 


  return (
    <div className="movieDetail">
      <div className="headerWrapper">
          {/* 영화 이미지, 포스터, 제목, 장르 별점 */}
        <MovieHeader />
      </div>
      <div className="contentWrapper">
        <div className="contentBox">
          <BasicInfo />
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
}

export default withRouter(MovieDetailContainer);