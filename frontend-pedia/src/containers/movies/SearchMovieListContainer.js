import React, { useEffect, useState, useCallback } from "react";
import qs from "qs";
import MovieList from "../../components/movies/MovieList";
import { withRouter } from "react-router";
import * as moviesApi from "../../lib/api/movies";
import { useSelector } from "react-redux";

const SearchMovieListContainer = ({ location }) => {
  const [loading, setLoading] = useState(null);
  const [reqStop, setReqStop] = useState(false);
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const { userId, keyword } = useSelector(({ user, autoCompletesMovies }) => ({
    keyword: autoCompletesMovies.keyword.keyword,
    userId: user.user.userId,
  }));
  // const { keyword } = qs.parse(location.search, {
  //   ignoreQueryPrefix: true,
  // });

  const getSearchMovies = function(newPage){
    moviesApi.listSearchMovies({
      keyword,
      page: newPage,
      userId
    });
  }
  // const getSearchMovies = async (newPage) => {
  //   try {
  //     setLoading(true);
  //     const response = await moviesApi.listSearchMovies({
  //       keyword,
  //       page: newPage,
  //       userId,
  //     });
  //     // console.log('response');
  //     // console.dir(response);
  //     // // setMovies([...movies, ...response.data]);
  //     // // setMovies(response.data);
      
  //     setLoading(false);
  //     // if(response.data.length === 0) setReqStop(true);
  //     return response.datagetSearchMovies;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };  

  useEffect(() => {
    getSearchMovies(0);
    setMovies((page));
  }, []);
  
  const _infiniteScroll = useCallback(() => {
    if (reqStop) return;
    console.log("scroll");
    
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
      );
      let scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
        );
        let clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
          console.log("fetchMore");
          setPage(page + 1);
          console.log("page: " + page+1);
          setMovies(movies.concat(getSearchMovies(page + 1)));
          // setMovies([...movies, ...(getSearchMovies(page + 1))]);
          console.log(movies)
    }
    else setReqStop(true);
  }, [page, movies]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <>
      <MovieList movies={movies} headerTitle="영화 검색 결과" />
      {loading && (
        <img src="/images/Rolling-50px.svg" style={{ marginLeft: "50%" }} />
      )}
      <button style={{ color: "white", backgroundColor: "white" }}>
        무한스크롤
      </button>
    </>
  );
};

export default withRouter(SearchMovieListContainer);
