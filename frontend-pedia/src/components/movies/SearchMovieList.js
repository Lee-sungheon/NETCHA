import React from "react";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./SearchMovieList.scss";

const MovieItem = ({ movie }) => {
  const { image, title, year, country, id } = movie;
  return (
    <Link to={`/movieDetail/${id}`}>
      <div className="movieWrap">
        <img className="moviePoster" src={image} />
        <div className="movieInfo">
          <div className="movieTitle">{title}</div>
          <div className="movieInfo">
            {year} · {country}
          </div>
        </div>
        <hr />
      </div>
    </Link>
  );
};

const SearchMovieList = ({ loading, movies, error }) => {
  if (error) {
    console.log("에러에러에러에러");
    return <h2>에러가 발생했습니다.</h2>;
  }
  // const history = useHistory();

  console.log("movies: " + movies);

  return (
    <>
      <div className="searchMovieListWrap">
        <div className="movieHeaderWrap">
          {/* <button className="beforeArrow" onClick={() => history.goBack(1)}> */}
          <button
            className="beforeArrow"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <img className="beforeArrowImage" src="/images/beforeArrow.png" />
          </button>
          <div className="movieHeader">영화</div>
        </div>
        <hr />
        {/* 로딩 중이 아니고, 영화 리스트가 존재할 때만 보여준다.*/}
        {!loading && movies && (
          <div className="movieListWrap">
            {movies.map((movie) => {
              console.dir(movie);
              return <MovieItem movie={movie} key={movie.id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchMovieList;
