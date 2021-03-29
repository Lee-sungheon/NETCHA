import React from 'react';
import './MovieDetail.scss';
import BasicInfo from '../component/BasicInfo';
import Actors from '../component/Actors';
import StarGraph from '../component/StarGraph';
import Comment from '../component/Comment/Comment';
import Gallery from '../component/Gallery';
import Video from '../component/Video';
import SimilarMovies from '../component/SimilarMovies';
import MovieHeader from '../component/MovieHeader';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
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
