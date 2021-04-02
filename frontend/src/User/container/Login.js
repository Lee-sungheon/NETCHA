import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state";
import { useHistory } from "react-router";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  login_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  login_page: {
    background: "rgb(0, 0, 0, 0.5)",
  },
  login_div_back: {
    margin: "0 auto",
    width: "100vw",
    maxWidth: "450px",
    height: "1000px",
    paddingTop: "30px",
  },
  login_div: {
    background: "rgb(0, 0, 0, 0.7)",
    height: "540px",
    width: "314px",
    padding: "60px 68px",
  },
  login_div_login: {
    color: "white",
    marginBottom: "25px",
  },
  login_div_textfield: {
    borderRadius: "4px",
    backgroundColor: "white",
    width: "100%",
    marginBottom: "15px",
  },
  login_div_loginbutton: {
    width: "100%",
    backgroundColor: "#e50914",
    color: "white",
    marginTop: "25px",
    height: "45px",
  },
  login_div2: {
    display: "flex",
    margin: "10px 0",
  },
  login_div2_span: {
    color: "#b3b3b3",
    fontSize: "0.8rem",
    margin: "auto",
  },
  login_footer: {
    marginTop: "-300px",
    height: "300px",
    backgroundColor: "black",
    background: "rgb(0, 0, 0, 0.7)",
    padding: "20px",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({ userId: "", password: "" });

  useEffect(() => {
    props.toggleIsHeader(false);
    if (history.location.state) {
      setInputData({ ...inputData, userId: history.location.state.userId });
    }
    return () => {
      props.toggleIsHeader(true);
    };
  }, []);

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
      .post(
        "http://j4d105.p.ssafy.io:9000/netcha/user/login",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        if (res.data.response === "success") {
          console.log("로그인성공");

          await dispatch(actions.userLogin(res.data.data));

          login_(res.data.data);
        } else {
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
    // window.sessionStorage.setItem(
    //   "userId",
    //   JSON.parse(JSON.parse(window.sessionStorage.getItem("persist:root")).user)
    //     .userData.member.userId
    // );
    // window.sessionStorage.setItem(
    //   "token",
    //   JSON.parse(JSON.parse(window.sessionStorage.getItem("persist:root")).user)
    //     .userData.token
    // );

    history.push({
      pathname: "/",
    });
    alert("로그인되었습니다.");
  };

  return (
    <div>
      <div className={classes.login_back}>
        <div className={classes.login_page}>
          <header>
            <Link to={"/"}>
              <img
                src={"../images/netcha.png"}
                style={{ height: "90px", marginRight: "10px" }}
                alt="netcha"
              />
            </Link>
          </header>
          <div className={classes.login_div_back}>
            <div className={classes.login_div}>
              <div>
                <div>
                  <h1 className={classes.login_div_login}>로그인</h1>
                  <form autoComplete="off">
                    <TextField
                      id="userId"
                      type="email"
                      label="이메일 주소 또는 전화번호"
                      InputLabelProps={{
                        color: "secondary",
                      }}
                      value={inputData.userId}
                      variant="filled"
                      onChange={onUserIdHandler}
                      className={classes.login_div_textfield}
                    />

                    <TextField
                      label="비밀번호"
                      variant="filled"
                      color="secondary"
                      type="password"
                      value={inputData.password}
                      onChange={onPasswordHandler}
                      className={classes.login_div_textfield}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          login(e);
                        }
                      }}
                    />

                    <Button
                      variant="contained"
                      className={classes.login_div_loginbutton}
                      onClick={login}
                    >
                      로그인
                    </Button>
                  </form>
                  <div className={classes.login_div2}>
                    <div>
                      <span className={classes.login_div2_span}>
                        <Checkbox
                          id="check1"
                          defaultChecked
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          style={{
                            color: "#b3b3b3",
                            margin: "0px",
                            padding: "0px",
                          }}
                        />
                        로그인 정보 저장
                      </span>
                    </div>
                    <div
                      style={{
                        margin: "auto",
                      }}
                    >
                      <span className={classes.login_div2_span}>
                        도움이 필요하신가요?
                      </span>
                    </div>
                  </div>
                  <p></p>

                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    Netcha 회원이 아닌가요?{" "}
                    <Link
                      to="/signup"
                      style={{
                        color: "white",
                      }}
                    >
                      지금 가입하세요!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.login_footer}>
            <div
              style={{
                color: "#757575",
                margin: "10px 20px",
              }}
            >
              <div>질문이 있으신가요? 문의 전화 : 00-1234-4321</div>
              <div>자주 묻는 질문</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
