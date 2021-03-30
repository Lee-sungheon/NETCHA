import React from "react";
import { useHistory } from "react-router";
import "./SearchMovieList.scss";

const SearchMovieList = ({ data }) => {
  const history = useHistory();

  return (
    <>
      <div className="searchMovieListWrap">
        <div className="movieHeaderWrap">
          <button className="beforeArrow" onClick={() => history.goBack()}>
            <img className="beforeArrowImage" src="/images/beforeArrow.png" />
          </button>
          <div className="movieHeader">영화</div>
        </div>
        <hr />
        <div className="movieListWrap">
          {data.map((movie) => {
            console.dir(movie);
            return (
              <div className="movieWrap">
                <img className="moviePoster" src={movie.image} />
                <div className="movieInfo">
                  <div className="movieTitle">{movie.title}</div>
                  <div className="movieInfo">2021 · 한국</div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchMovieList;
