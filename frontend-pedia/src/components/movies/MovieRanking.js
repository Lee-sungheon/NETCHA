import React from "react";
import LargeMovieSlider from "../slider/LargeMovieSlider";

const MovieRanking = ({ user, title, loading, error, movies }) => {
  if (error) {
    return (
      <h2 style={{paddingBottom: "250px"}}>에러가 발생했습니다.</h2>
    );
  }

  return (
    <>
      {!loading && movies && <LargeMovieSlider user={user} movies={movies} title={title} />}
    </>
  );
};

export default MovieRanking;
