import { BrowserRouter, Route } from 'react-router-dom';
import MovieRanking from './pages/MovieRankingPage';
import User from './pages/User';
import UserStaticsPage from './pages/UserStaticsPage';
import MovieDetail from './pages/MovieDetailPage';
import './App.scss';
import SearchMovieListPage from './pages/SearchMovieListPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={MovieRanking} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/user/statics/:id" component={UserStaticsPage} />
        <Route exact path="/movieDetail/:movieNo" component={MovieDetail} />
        <Route exact path="/searchMovie" component={SearchMovieListPage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
