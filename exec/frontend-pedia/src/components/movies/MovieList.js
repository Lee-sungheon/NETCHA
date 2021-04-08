import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './MovieList.scss';

const MovieItem = ({ movie }) => {
  const { posterUrl, title, open, country, no, avgRank } = movie;
  return (
    <Link to={`/movieDetail/${no}`}>
      <div className="movieWrap">
        <img
          className="moviePoster"
          src={
            posterUrl === 'default'
              ? '../../images/defaultPoster.png'
              : posterUrl
          }
          alt={title}
        />
        <div className="movieInfo">
          <div className="movieTitle">{title}</div>
          <div className="movieInfo">
            {open? open.split('-')[0] : ''} · {country}
          </div>
        </div>
        <hr />
      </div>
    </Link>
  );
};

const MovieList = ({ movies, headerTitle }) => {
  const history = useHistory();

  return (
    <>
      <div className="searchMovieListWrap">
        <div className="movieHeaderWrap">
          <button className="beforeArrow" onClick={() => history.goBack()}>
            <img
              className="beforeArrowImage"
              src="/images/beforeArrow.png"
              alt="이전페이지"
            />
          </button>
          <div className="movieHeader">{headerTitle}</div>
        </div>
        <hr />
        {movies && movies.length > 0 && (
          <div className="movieListWrap">
            {movies.map((movie, index) => {
              return <MovieItem movie={movie} key={index} />;
            })}
          </div>
        )}
        { !movies &&
          <div className="movieListWrap"  style={{height: 500, fontSize: 20}}>영화가 없습니다</div>
        }
      </div>
    </>
  );
};

export default MovieList;
