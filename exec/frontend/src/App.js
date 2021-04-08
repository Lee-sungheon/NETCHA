import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./common/store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/container/Home";
import MovieFilter from "./moviefliter/container/MovieFilter";
import Header from "./navbar/container/Header";
import Footer from "./navbar/container/Footer";
import LikeList from "./likeList/container/LikeList";
import SearchList from "./navbar/container/SearchList";
import "./App.scss";
import Evaluation from "./evaluation/container/Evaluation";
import Account from "./user/container/Account";
import Login from "./user/container/Login";
import Mbti from "./mbti/container/Mbti";
import Signup from "./user/container/Signup";
import SignupDetail from "./user/container/SignupDetail";
import ProfileList from "./user/container/ProfileList";
import MbtiResult from "./mbti/container/MbtiResult";
import Movie from "./movie/container/Movie";
import cx from "classnames";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import TestMBTI from "./mbti/container/TestMbti";

const persistor = persistStore(store);
function App() {
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={cx("App", { "App--toggle": toggleButton })}>
            <Header
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
            />
            <Route exact path="/">
              {window.sessionStorage.getItem("token") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/signup" />
              )}
              <Login />
            </Route>
            <PublicRoute
              restricted
              path="/login"
              component={Login}
            ></PublicRoute>
            <PublicRoute
              restricted
              path="/signup"
              component={Signup}
            ></PublicRoute>
            <Switch>
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute
                path="/movielist"
                component={MovieFilter}
              ></PrivateRoute>
              <PrivateRoute path="/search" component={SearchList} />
              <PrivateRoute path="/mylike" component={LikeList}></PrivateRoute>
              <PrivateRoute path="/eval" component={Evaluation}></PrivateRoute>
              <PrivateRoute path="/account" component={Account}></PrivateRoute>
              <PublicRoute
                restricted
                path="/signupdetail"
                component={SignupDetail}
              ></PublicRoute>
              <PrivateRoute
                path="/profilelist"
                component={ProfileList}
              ></PrivateRoute>
              <PrivateRoute
                path="/testmbti"
                component={TestMBTI}
              ></PrivateRoute>
              <PrivateRoute
                path="/mbtiresult"
                component={MbtiResult}
              ></PrivateRoute>
              <PrivateRoute path="/mbti" component={Mbti}></PrivateRoute>
              <PrivateRoute path="/movie/:no" component={Movie}></PrivateRoute>
            </Switch>
            <Footer />
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!window.sessionStorage.getItem("token") && restricted ? (
          
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!window.sessionStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
