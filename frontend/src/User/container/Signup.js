import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  signup_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    // height: "800px",
    marginTop: "-64px",
  },
  signup_div: {
    background: "rgb(0, 0, 0, 0.5)",
  },
  header_link: {
    position: "absolute",
    right: "3vw",
    top: "1.5vw",
  },
  header_link_button: {
    width: "",
    backgroundColor: "#e50914",
    color: "white",
    marginLeft: "2px",
    fontSize: "1rem",
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

  const [inputData, setInputData] = useState({
    userId: "",
  });

  useEffect(() => {
    props.toggleIsHeader(false);
    return () => {
      props.toggleIsHeader(true);
    };
  }, []);
  const onUserIdHandler = (e) => {
    setInputData({ ...inputData, userId: e.target.value });
  };
  const onStart = (e) => {
    e.preventDefault();
    axios
      .post("netcha/user/checkId", inputData.userId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
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
        <header>
          <Link to={"/"}>
            <img
              src={"../images/netcha.png"}
              style={{ height: "90px", marginRight: "10px" }}
              alt="netcha"
            />
          </Link>
          <Link to="/login" className={classes.header_link}>
            <Button variant="contained" className={classes.header_link_button}>
              로그인
            </Button>
          </Link>
        </header>
        <section>
          <div className={classes.signup_section_div}>
            <div className={classes.signup_section_div_text}>
              영화, TV 프로그램을
              <br /> 무제한으로.
            </div>
            <div className={classes.signup_section_div_text2}>
              다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
            </div>
            <form className={classes.signup_form}>
              <div>
                시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
                주소를 입력하세요.
              </div>
              <div className={classes.signup_form_div}>
                <TextField
                  label="이메일 주소"
                  InputLabelProps={{
                    color: "secondary",
                  }}
                  value={inputData.userId}
                  onChange={onUserIdHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onStart(e);
                    }
                  }}
                  variant="filled"
                  style={{
                    backgroundColor: "white",
                    width: "68%",
                    marginBottom: "15px",
                    height: "100%",
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    width: "30%",
                    backgroundColor: "#e50914",
                    color: "white",
                    height: "100%",

                    marginLeft: "2px",
                    fontSize: "1.5rem",
                  }}
                  onClick={onStart}
                >
                  시작하기
                </Button>
              </div>
            </form>
          </div>
        </section>
        <div
          style={{
            backgroundColor: "black",
            // width: "100%",
            height: "300px",
            borderTop: "solid #222 8px",
            padding: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "90vw",
              maxWidth: "1100px",
              height: "300px",
              margin: "auto",
            }}
          >
            <div
              style={{
                width: "50%",
                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: "50px",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                TV로 즐기세요.
              </div>
              <div
                style={{
                  fontSize: "25px",
                  marginTop: "15px",
                }}
              >
                스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
                플레이어 등 다양한 디바이스에서 시청하세요.
              </div>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                height: "100%",
                width: "50%",
                color: "black",
              }}
            >
              <div>
                <img
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                  alt=""
                  style={{
                    height: "400px",
                    width: "500px",
                    marginTop: "-50px",
                    marginLeft: "50px",
                    position: "absolute",
                    zIndex: "1",
                  }}
                ></img>
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  style={{
                    height: "210px",
                    width: "600px",
                    position: "absolute",
                    marginTop: "35px",
                  }}
                >
                  <source
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v  "
                    type="video/mp4"
                  ></source>
                </video>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "500px",
            borderTop: "solid #222 8px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "500px",
            borderTop: "solid #222 8px",
          }}
        ></div>
      </div>
    </div>
  );
}
