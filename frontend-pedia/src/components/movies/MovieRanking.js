import React from "react";
import LargeMovieSlider from "../slider/LargeMovieSlider";

const MovieRankingComponent = ({ loading, error, movies }) => {
  if (error) {
    console.log("에러에러에러에러");
    return <h2>에러가 발생했습니다.</h2>;
  }

  console.log("movies: " + movies);

  return (
    <>
      {!loading && movies && (
        <div className="container1">
          <div className="container2">
            <LargeMovieSlider movies={movies} title="박스오피스 순위" />
          </div>
          <div className="container2">
            <LargeMovieSlider movies={movies} title="넷챠 영화 순위" />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieRankingComponent;
