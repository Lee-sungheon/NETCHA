import React from "react";
import LargeMovieSlider from "../slider/LargeMovieSlider";

const MovieRankingComponent = ({ movies }) => {

    return (
      <div className="container1">
        <div className="container2">
          <LargeMovieSlider data={movies} title='박스오피스 순위' />
        </div>
        <div className="container2">
          <LargeMovieSlider data={movies} title='넷챠 영화 순위' />
        </div>
      </div>
    );
};

export default MovieRankingComponent;
