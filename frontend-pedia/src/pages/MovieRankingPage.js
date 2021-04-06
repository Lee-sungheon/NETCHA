import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import MovieRankingContainer from '../containers/movies/MovieRankingContainer';
import NewMovieContainer from '../containers/movies/NewMovieContainer';
import './MovieRankingPage.scss';

export default function MovieRanking() {
  return (
    <>
      <HeaderContainer />
      <div>
        <div className="container1">
          <div className="container2">
            <NewMovieContainer title="최신 개봉 영화" />
          </div>
          <div className="container2">
            <MovieRankingContainer title="넷챠 영화 순위" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
