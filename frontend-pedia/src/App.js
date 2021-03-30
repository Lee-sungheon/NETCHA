import { BrowserRouter, Route } from "react-router-dom";
import MovieRanking from "./pages/MovieRankingPage";
import User from "./pages/User";
import UserStatics from "./pages/UserStatics";
import MovieDetail from './pages/MovieDetailPage';
import "./App.scss";
import SearchMovieListPage from "./pages/SearchMovieListPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={MovieRanking} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/user/statics/:id" component={UserStatics} />
        <Route exact path="/movieDetail/:movieId" component={MovieDetail} />
        <Route exact path="/searchMovie/:searchKeyword" component={SearchMovieListPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
