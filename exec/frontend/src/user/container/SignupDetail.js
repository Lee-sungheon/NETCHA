import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  signupDetail_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  signupDetail_div: {
    margin: "0 auto",
    width: "100%",
    maxWidth: "450px",
    height: "1000px",
  },
  signupDetail_div_div: {
    background: "rgb(0, 0, 0, 0.7)",
    width: "314px",
    padding: "60px 68px",
  },
  signupDetail_textfield: {
    borderRadius: "4px",
    backgroundColor: "white",
    width: "100%",
    marginBottom: "15px",
  },
  signupDetail_button: {
    width: "100%",
    backgroundColor: "#e50914",
    color: "white",
    marginTop: "25px",
    height: "45px",
  },
}));

export default function SignupDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [inputData, setInputData] = useState({
    userId: location.state.userId,
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    phone: "",
  });
  const [inputCheck, setInputCheck] = useState({
    userId: false,
    confirmPassword: false,
    nickname: true,
    phone: true,
    name: true,
  });
  const onUserIdHandler = (e) => {
    setInputData({ ...inputData, userId: e.target.value });
  };
  const onPasswordHandler = (e) => {
    setInputData({ ...inputData, password: e.target.value });
  };
  const onConfirmPasswordHandler = (e) => {
    setInputData({ ...inputData, confirmPassword: e.target.value });
  };
  const onNameHandler = (e) => {
    setInputData({ ...inputData, name: e.target.value });
  };
  const onNicknameHandler = (e) => {
    setInputData({ ...inputData, nickname: e.target.value });
  };
  const onPhoneHandler = (e) => {
    setInputData({ ...inputData, phone: e.target.value });
  };
  useEffect(() => {
    if (
      inputData.password &&
      inputData.confirmPassword === inputData.password
    ) {
      setInputCheck({ ...inputCheck, confirmPassword: true });
    } else {
      setInputCheck({ ...inputCheck, confirmPassword: false });
    }
  }, [inputData.password, inputData.confirmPassword]);

  useEffect(() => {
    if (inputData.userId) {
      setTimeout(() => {}, 100);
      const body = inputData.userId;
      const check_Email = function (str) {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return regExp.test(str) ? true : false;
      };

      if (check_Email(inputData.userId) === false) {
        setInputCheck({ ...inputCheck, userId: false });
        return;
      }
      axios
        .post("netcha/user/checkId", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.data === 0) {
            setInputCheck({ ...inputCheck, userId: false });
          } else {
            setInputCheck({ ...inputCheck, userId: true });
          }
        })
        .catch((err) => {});
    }
  }, [inputData.userId]);

  // useEffect(() => {
  //   if (history.location.state) {
  //     setInputData({ ...inputData, userId: history.location.state.userId });
  //   }
  //   return () => {};
  // }, [history.location.state]);

  const signUp = (e) => {
    e.preventDefault();
    const body = {
      mbti: "",
      name: inputData.name,
      nickname: inputData.nickname,
      password: inputData.password,
      phone: inputData.phone,
      userId: inputData.userId,
    };
    if (inputCheck.userId && inputCheck.confirmPassword) {
      axios
        .post("netcha/user/signup", JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          alert("회원가입이 완료되었습니다.");
          alert("인증메일이 발송되었습니다. 확인해주세요");
          history.push({
            pathname: "/login",
          });
          axios
            .post(
              "netcha/user/verify",
              JSON.stringify({ userId: body.userId }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
            })
            .catch((err) => {
              console.log("인증메일 발송 실패");
            });
        })
        .catch((err) => {
          console.log("계정생성 실패");
          console.error(err);
        });
    }
  };
  return (
    <div className={classes.signupDetail_back}>
      <div
        style={{
          background: "rgb(0, 0, 0, 0.5)",
        }}
      >
        <header>
          <Link to="/signup">
            <img
              src={"../images/netcha.png"}
              style={{ height: "90px", marginRight: "10px" }}
              alt="netcha"
            />
          </Link>
        </header>
        <div className={classes.signupDetail_div}>
          <div className={classes.signupDetail_div_div}>
            <div>
              <div>
                <h1
                  style={{
                    color: "white",
                    marginBottom: "25px",
                  }}
                >
                  회원가입
                </h1>
                <form autoComplete="off">
                  <TextField
                    label="이메일 주소"
                    type="email"
                    id="userId"
                    value={inputData.userId}
                    onChange={onUserIdHandler}
                    InputLabelProps={{
                      color: "secondary",
                    }}
                    variant="filled"
                    className={classes.signupDetail_textfield}
                  />
                  {inputData.userId ? (
                    <>
                      {inputCheck.userId ? (
                        <div
                          style={{
                            color: "#42a5f5",
                            margin: "-10px 0 7px 0",
                          }}
                        >
                          사용가능한 이메일 입니다
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "#ef5350",
                            margin: "-10px 0 7px 0",
                          }}
                        >
                          사용할 수 없는 이메일 입니다
                        </div>
                      )}
                    </>
                  ) : null}
                  <TextField
                    id="password"
                    value={inputData.password}
                    onChange={onPasswordHandler}
                    label="비밀번호"
                    type="password"
                    variant="filled"
                    color="secondary"
                    className={classes.signupDetail_textfield}
                  />

                  <TextField
                    id="confrimpassword"
                    value={inputData.confirmPassword}
                    onChange={onConfirmPasswordHandler}
                    label="비밀번호확인"
                    type="password"
                    variant="filled"
                    color="secondary"
                    className={classes.signupDetail_textfield}
                  />
                  {inputData.password ? (
                    <>
                      {inputCheck.confirmPassword ? (
                        <div
                          style={{
                            color: "#42a5f5",
                            margin: "-10px 0 7px 0",
                          }}
                        >
                          비밀번호가 일치합니다.
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "#ef5350",
                            margin: "-10px 0 7px 0",
                          }}
                        >
                          비밀번호가 다릅니다.
                        </div>
                      )}
                    </>
                  ) : null}
                  <TextField
                    id="name"
                    value={inputData.name}
                    onChange={onNameHandler}
                    label="이름"
                    variant="filled"
                    color="secondary"
                    className={classes.signupDetail_textfield}
                  />
                  <TextField
                    id="nickname"
                    value={inputData.nickname}
                    onChange={onNicknameHandler}
                    label="닉네임"
                    variant="filled"
                    color="secondary"
                    className={classes.signupDetail_textfield}
                  />
                  <TextField
                    id="phone"
                    value={inputData.phone}
                    onChange={onPhoneHandler}
                    label="전화번호"
                    variant="filled"
                    color="secondary"
                    className={classes.signupDetail_textfield}
                  />
                  <Button
                    variant="contained"
                    className={classes.signupDetail_button}
                    onClick={signUp}
                  >
                    회원가입
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
