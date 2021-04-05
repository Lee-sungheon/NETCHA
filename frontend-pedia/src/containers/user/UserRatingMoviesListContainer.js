import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from 'react-redux';
import MovieList from "../../components/movies/MovieList";
import { withRouter } from "react-router";
import * as moviesApi from "../../lib/api/movies";

const UserRatingMoviesListContainer = () => {
  const {userId} = useSelector(({user}) => ({userId : user.user.userId}));
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState(null);

  const getUserRatingMovies = async (newPage) => {
    try {
      const response = await moviesApi.listRatingMovies({page: newPage, userId});
      if (movies) {
        setMovies([...movies, ...response.data]);
      } else {
        setMovies(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserRatingMovies(page);
  }, []);

  const _infiniteScroll = useCallback(() => {
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

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("fetchMore");
      if(movies) {
        setPage(page + 1);
        setMovies(movies.concat(getUserRatingMovies(page + 1)));
      }
    }
  }, [page, movies]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <>
      <MovieList movies={movies} headerTitle="평가한 영화" />
      <button style={{color: "white", backgroundColor: "white"}}>무한스크롤</button>
    </>
  );
};

export default withRouter(UserRatingMoviesListContainer);
