// import MovieDetail from './movieDetail/container/MovieDetail.js';
import { BrowserRouter } from 'react-router-dom';
import Home from './home/container/Home';
import Footer from './navbar/container/Footer';
import Header from './navbar/container/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
