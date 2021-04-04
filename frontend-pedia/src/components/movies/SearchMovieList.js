import React, { useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SearchMovieList.scss';

const MovieItem = ({ movie }) => {
  const { posterUrl, title, open, country, no } = movie;
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

const SearchMovieList = ({ movies }) => {
  const history = useHistory();

  // if (error) {
  //   return <h2 style={{ paddingTop: '100px' }}>에러가 발생했습니다.</h2>;
  // }



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
          <div className="movieHeader">영화</div>
        </div>
        <hr />
        {/* 로딩 중이 아니고, 영화 리스트가 존재할 때만 보여준다.*/}
        {/* {!loading && movies && ( */}
        {movies && (
          <div className="movieListWrap">
            {movies.map((movie, index) => {
              return <MovieItem movie={movie} key={index} />;
            })}
            {/* <div ref={setTarget} className="last-item">
              <Loader size="s" />
            </div> */}
          </div>
        )}
      </div>
      {/* <div>
        <button onClick={fetchMoreData}>더보기</button>
      </div> */}
    </>
  );
};

export default SearchMovieList;
