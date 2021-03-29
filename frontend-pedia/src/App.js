import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import Header from './components/common/Header'
import User from './pages/User';
import UserStatics from './pages/UserStatics';
import MovieDetail from './movieDetail/container/MovieDetail';
import './App.scss';

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
