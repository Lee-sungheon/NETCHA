import { BrowserRouter, Route } from "react-router-dom";
import MovieRanking from "./pages/MovieRankingPage";
import User from "./pages/User";
import UserStaticsPage from "./pages/UserStaticsPage";
import MovieDetail from "./pages/MovieDetailPage";
import CommentDetail from "./pages/CommentDetailPage";
import "./App.scss";
import SearchMovieListPage from "./pages/SearchMovieListPage";
import UserRatingMoviesListPage from "./pages/UserRatingMoviesListPage";
import UserZzimMoviesListPage from "./pages/UserZzimMoviesListPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={MovieRanking} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/user/statics/:id" component={UserStaticsPage} />
        <Route exact path="/movieDetail/:movieNo" component={MovieDetail} />
        <Route
          exact
          path="/commentDetail/:commentNo"
          component={CommentDetail}
        />
        <Route exact path="/searchMovie" component={SearchMovieListPage} />
        <Route
          exact
          path="/userRatingMoviesList"
          component={UserRatingMoviesListPage}
        />
        <Route
          exact
          path="/userZzimMoviesList"
          component={UserZzimMoviesListPage}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
