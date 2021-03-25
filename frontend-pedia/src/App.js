// import MovieDetail from './movieDetail/container/MovieDetail.js';
import { BrowserRouter } from 'react-router-dom';
import Footer from './navbar/container/Footer';
import Header from './navbar/container/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* <div style={{height: '1000px', width: '100%'}}></div> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
