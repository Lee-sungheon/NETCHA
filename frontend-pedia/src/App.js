import { BrowserRouter, Route } from "react-router-dom";
import MovieRanking from "./pages/MovieRankingPage";
import User from "./pages/User";
import UserStaticsPage from "./pages/UserStaticsPage";
import MovieDetail from "./pages/MovieDetailPage";
import CommentDetail from "./pages/CommentDetailPage";
import "./App.scss";
import SearchMovieListPage from "./pages/SearchMovieListPage";

const App = () => {
  // const [cookies, setCookie] = useCookies(['user']);
  // const {user} = useSelector((user) => (user.user));
  // const dispatch = useDispatch();
  // // setCookie('user', {userId: '내가바로아이디', userName: '내가바로이름'}, {maxAge: 2000});
  // useEffect(() => {
  //   if(!cookies.user) {  // 지금은 쿠키 없으니 임의로 넣음
  //     localStorage.setItem('user', JSON.stringify({userId: '내가바로아이디', userName: '내가바로이름'}));
  //   }
  //   const lsUser = localStorage.getItem('user');
  //   if(lsUser) dispatch(setUser(lsUser)); // 넷챠에서 온 쿠키로 state.user 에 user 정보 저장
  // }, [user]);

  // if(user) {
  //   console.dir(user);
  // }

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
      </BrowserRouter>
    </div>
  );
};

export default App;
