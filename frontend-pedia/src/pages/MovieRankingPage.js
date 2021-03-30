import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MovieRankingContainer from "../containers/movies/MovieRankingContainer";
import './MovieRankingPage.scss';

export default function MovieRanking() {
  return (
    <>
      <Header />
      <MovieRankingContainer />
      <Footer />
    </>
  );
}
