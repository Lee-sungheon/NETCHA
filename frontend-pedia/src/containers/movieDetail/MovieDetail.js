import React from 'react';
import './MovieDetail.scss';
import MovieHeader from '../../components/movieDetail/MovieHeader'
import BasicInfo from '../../components/movieDetail/BasicInfo'
import Actors from '../../components/movieDetail/Actors'
import StarGraph from '../../components/movieDetail/StarGraph'
import Comment from '../../components/movieDetail/Comment/Comment'
import SimilarMovies from '../../components/movieDetail/SimilarMovies'
import Gallery from '../../components/movieDetail/Gallery'
import Video from '../../components/movieDetail/Video'

// import { useDispatch, useSelector } from 'react-redux';

export default function MovieDetail() {
  // const dispatch = useDispatch();

  return (
    <div className="movieDetail">
      <div className="headerWrapper">
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
