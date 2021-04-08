import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router";
import SignupHeader from "../component/SignupHeader";
import SignupSection from "../component/SignupSection";
import SignupSubSection from "../component/SignupSubSection";
import { useDispatch } from "react-redux";
import { navActions } from "../../navbar/state";

const useStyles = makeStyles((theme) => ({
  signup_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  signup_div: {
    background: "rgb(0, 0, 0, 0.5)",
  },

  signup_section_div: {
    width: "950px",
    margin: "0 auto",
    padding: "200px 0",
    color: "white",
    textAlign: "center",
  },
  signup_section_div_text: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  signup_section_div_text2: {
    fontSize: "1.5rem",
    marginTop: "15px",
  },
  signup_form: {
    marginTop: "15px",
  },
  signup_form_div: {
    width: "600px",
    margin: "25px auto",
  },
  signup_form_textfield: {
    backgroundColor: "white",
    width: "68%",
    marginBottom: "15px",
    height: "100%",
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    userId: "",
  });
  useEffect(() => {
    dispatch(navActions.headerToggle(false));
    return () => {};
  }, [dispatch]);
  const onUserIdHandler = (e) => {
    setInputData({ ...inputData, userId: e.target.value });
  };
  const onStart = (e) => {
    e.preventDefault();
    //이메일 유효성검사
    const check_Email = function (str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    };

    if (check_Email(inputData.userId) === false) {
      alert("이메일 형식이 유효하지 않습니다.");
      return;
    }
    axios
      .post("netcha/user/checkId", inputData.userId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.data === 0) {
          // 로그인화면
          history.push({
            pathname: "/login",
            state: { userId: inputData.userId },
          });
        } else {
          // 회원가입화면
          history.push({
            pathname: "/signupdetail",
            state: { userId: inputData.userId },
          });
        }
      });
  };
  return (
    <div className={classes.signup_back}>
      <div className={classes.signup_div}>
        <SignupHeader />
        <SignupSection
          inputData={inputData}
          onUserIdHandler={onUserIdHandler}
          onStart={onStart}
        />
        <SignupSubSection />

        {/* <div
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "500px",
            borderTop: "solid #222 8px",
          }}
        ></div> */}
      </div>
    </div>
  );
}
