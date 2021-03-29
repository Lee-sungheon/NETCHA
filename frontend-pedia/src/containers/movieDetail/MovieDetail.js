import React from 'react';
import './MovieDetail.scss';
import BasicInfo from '../../movieDetail/component/BasicInfo';
import Actors from '../../movieDetail/component/Actors';
import StarGraph from '../../movieDetail/component/StarGraph';
import Comment from '../../components/movieDetail/Comment/Comment';
import Gallery from '../../movieDetail/component/Gallery';
import Video from '../../movieDetail/component/Video';
import SimilarMovies from '../../movieDetail/component/SimilarMovies';
import MovieHeader from '../../movieDetail/component/MovieHeader';
import { useDispatch, useSelector } from 'react-redux';

export default function MovieDetail() {
  const dispatch = useDispatch();

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
