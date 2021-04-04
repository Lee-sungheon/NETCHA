import React, { useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SearchMovieList.scss";

const MovieItem = ({ movie }) => {
  const { posterUrl, title, open, country, id } = movie;
  return (
    <Link to={`/movieDetail/${id}`}>
      <div className="movieWrap">
        <img className="moviePoster" src={posterUrl === "default" ? "../../images/defaultPoster.png" : posterUrl} alt={title} />
        <div className="movieInfo">
          <div className="movieTitle">{title}</div>
          <div className="movieInfo">
            {open.split('-')[0]} · {country}
          </div>
        </div>
        <hr />
      </div>
    </Link>
  );
};

const SearchMovieList = ({ loading, movies, error, page, fetchMoreData }) => {
  const history = useHistory();

  if (error) {
    return <h2 style={{paddingTop: "100px"}}>에러가 발생했습니다.</h2>;
  }


  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      // setItemIndex(itemIndex + 100);
      // setResult(movies.concat(video_list.slice(itemIndex+100, itemIndex+200)));
      fetchMoreData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);


  return (
    <>
      <div className="searchMovieListWrap">
        <div className="movieHeaderWrap">
          <button className="beforeArrow" onClick={() => history.goBack()}>
            <img className="beforeArrowImage" src="/images/beforeArrow.png" alt="이전페이지" />
          </button>
          <div className="movieHeader">영화</div>
        </div>
        <hr />
        {/* 로딩 중이 아니고, 영화 리스트가 존재할 때만 보여준다.*/}
        {!loading && movies && (
          <div className="movieListWrap">
            {movies.map((movie) => {
              return <MovieItem movie={movie} key={movie.id} />;
            })}
          </div>
        )}
      </div>
      <div>
        <button onClick={fetchMoreData}>더보기</button>
      </div>
    </>
  );
};

export default SearchMovieList;
