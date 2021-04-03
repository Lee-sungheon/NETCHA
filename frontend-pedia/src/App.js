import { BrowserRouter, Route } from "react-router-dom";
import MovieRanking from "./pages/MovieRankingPage";
import User from "./pages/User";
import UserStaticsPage from "./pages/UserStaticsPage";
import MovieDetail from './pages/MovieDetailPage';
import "./App.scss";
import SearchMovieListPage from "./pages/SearchMovieListPage";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './modules/user';

const App = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const {user} = useSelector((user) => (user.user));
  const dispatch = useDispatch();
  useEffect(() => {
    if(!cookies.user) {  // 지금은 쿠키 없으니 임의로 넣음
      setCookie('user', {userId: '내가바로아이디', userName: '내가바로이름'}, {maxAge: 2000});
    }
    dispatch(setUser(cookies.user)); // 넷챠에서 온 쿠키로 state.user 에 user 정보 저장
  }, []);

  if(user) {
    console.dir(user);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={MovieRanking} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/user/statics/:id" component={UserStaticsPage} />
        <Route exact path="/movieDetail/:movieId" component={MovieDetail} />
        <Route exact path="/searchMovie" component={SearchMovieListPage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
