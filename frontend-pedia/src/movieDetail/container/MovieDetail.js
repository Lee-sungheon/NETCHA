import React from 'react';
import './MovieDetail.scss';
import { Container } from '@material-ui/core';
import BasicInfo from './BasicInfo';
import Actors from './Actors';
import StarGraph from './StarGraph';
import Comment from './Comment/Comment';
import Video from './Video';
import Gallery from './Gallery';
import SimilarMovies from './SimilarMovies';

export default function Home() {
  return (
    <div className="movieDetail">
      <div className="headerWrapper">헤더</div>
      <div className="contentWrapper">
        <Container className="contentBox" maxWidth="sm">
          <BasicInfo />
          <Actors />
          <StarGraph />
          <Comment />
          <Gallery />
          <Video />
          <SimilarMovies />
        </Container>
      </div>
      <div className="footer">푸터</div>
    </div>
  );
}
