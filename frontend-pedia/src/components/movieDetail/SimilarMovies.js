import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as moviesApi from "../../lib/api/movies";
import "./SimilarMovies.scss";

const SimilarMovies = ({ history, requestData }) => {
  const [movies, setMovies] = useState(null);

  const getListMovies = async () => {
    try {
      const response = await moviesApi.listSimilarMovies({ ...requestData });
      setMovies(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getListMovies();
  }, []);

  return (
    <>
      <div className="similarMovies">
        <div className="infoHeader">비슷한 작품</div>
        <div className="similarWrapper">
          {!movies && <div className="spinner"></div>}

          {movies &&
            movies.map((movie, index) => {
              if (movie.posterUrl === "default") return null;
              return (
                <div
                  className="similarBlock"
                  onClick={() => history.push("/movieDetail/" + movie.no)}
                  key={index}
                >
                  <img
                    className="similarMoviesImg"
                    alt="poster"
                    src={
                      movie.posterUrl === "default"
                        ? "../../images/defaultPoster.png"
                        : movie.posterUrl
                    }
                    width="150px"
                    height="200px"
                  />
                  <div className="similarTitle">{movie.title}</div>
                  <div className="similarRank">평균 ★ {movie.avgRank}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default withRouter(SimilarMovies);
