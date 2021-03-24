import React from "react";
import Header from './navbar/container/Header'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
