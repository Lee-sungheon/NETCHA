// import MovieDetail from './movieDetail/container/MovieDetail.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './home/container/Home';
import Footer from './navbar/container/Footer';
import Header from './navbar/container/Header'
import User from './User/container/User';
import './App.scss';
import UserStatics from './User/container/UserStatics';
import MovieDetail from './movieDetail/container/MovieDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/user/statics/:id" component={UserStatics} />
        <Route exact path="/movieDetail/:movieId" component={MovieDetail} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
