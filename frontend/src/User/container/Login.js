import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state";
import { navActions } from "../../navbar/state";
import { useHistory } from "react-router";
import axios from "axios";
import LoginForm from "../component/LoginForm";
import LoginSection from "../component/LoginSection";
import Footer from "../../navbar/container/Footer";
import "./Login.scss";

export default function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({ userId: "", password: "" });

  useEffect(() => {
    dispatch(navActions.headerToggle(false));
    if (history.location.state) {
      setInputData({ ...inputData, userId: history.location.state.userId });
    }
    return () => {};
  }, [dispatch, inputData, history.location.state]);

  const onUserIdHandler = (e) => {
    setInputData({ ...inputData, userId: e.target.value });
  };
  const onPasswordHandler = (e) => {
    setInputData({ ...inputData, password: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    const body = {
      userId: inputData.userId,
      password: inputData.password,
    };
    axios
      .post("netcha/user/login", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.response === "success") {
          console.log("로그인성공");

          await dispatch(navActions.headerToggle(true));
          await dispatch(actions.userLogin(res.data.data));

          login_(res.data.data);
        } else {
          console.log(document.cookie);
          console.log(getCookie("refreshToken"));
          console.log("로그인실패");
          alert("아이디/비밀번호가 틀렸습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login_ = (res) => {
    window.sessionStorage.setItem("userId", res.member.userId);
    window.sessionStorage.setItem("token", res.token);
    if (res.member.mbti) {
      history.push({
        pathname: "/home",
      });
    } else {
      history.push({
        pathname: "/mbti",
      });
    }
    alert("로그인되었습니다.");
  };

  function getCookie(name) {
    name = new RegExp(name + "=([^;]*)");

    return name.test(document.cookie) ? unescape(RegExp.$1) : "";
  }
  return (
    <div>
      <div className="login_back">
        <div className="login_page">
          <header>
            <img
              src={"../images/netcha.png"}
              style={{ height: "90px", marginRight: "10px" }}
              alt="netcha"
            />
          </header>
          <div className="login_div_back">
            <div className="login_div">
              <h1 className="login_div_login">로그인</h1>
              <LoginForm
                inputData={inputData}
                onUserIdHandler={onUserIdHandler}
                login={login}
                onPasswordHandler={onPasswordHandler}
              />
              <LoginSection />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
