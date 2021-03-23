import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [checked, setChecked] = useState(true);
  const [inputData, setInputData] = useState({ userId: "", password: "" });

  useEffect(() => {
    props.toggleIsHeader(false);
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

  const login = () => {};

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
          marginTop: "-64px",
        }}
      >
        <div
          style={{
            background: "rgb(0, 0, 0, 0.5)",
            width: "100vw",
          }}
        >
          <header>
            <Link to={"/"}>
              <img
                src={"../images/netcha.png"}
                style={{ height: "90px", marginRight: "10px" }}
                alt="netcha"
              />
            </Link>
          </header>
          <div
            style={{
              margin: "0 auto",
              width: "100vw",
              maxWidth: "450px",
              height: "1000px",
              paddingTop: "30px",
            }}
          >
            <div
              style={{
                background: "rgb(0, 0, 0, 0.7)",
                height: "540px",
                width: "314px",
                padding: "60px 68px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <div>
                  <h1
                    style={{
                      color: "white",
                      marginBottom: "25px",
                    }}
                  >
                    로그인
                  </h1>
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
                      style={{
                        borderRadius: "4px",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    />

                    <TextField
                      label="비밀번호"
                      variant="filled"
                      color="secondary"
                      type="password"
                      value={inputData.password}
                      onChange={onPasswordHandler}
                      style={{
                        borderRadius: "4px",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    />

                    <Button
                      variant="contained"
                      style={{
                        width: "100%",
                        backgroundColor: "#e50914",
                        color: "white",
                        marginTop: "25px",
                        height: "45px",
                      }}
                    >
                      로그인
                    </Button>
                  </form>
                  <div
                    style={{
                      display: "flex",
                      margin: "10px 0",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#b3b3b3",
                          fontSize: "0.8rem",
                          margin: "auto",
                        }}
                      >
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
                        color: "#b3b3b3",
                        fontSize: "0.8rem",
                        margin: "auto",
                      }}
                    >
                      <span>도움이 필요하신가요?</span>
                    </div>
                  </div>
                  <p></p>
                  <div
                    style={{
                      color: "white",
                    }}
                  >
                    sns로그인
                  </div>
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
          <div
            style={{
              marginTop: "-300px",
              height: "300px",
              backgroundColor: "black",
              background: "rgb(0, 0, 0, 0.7)",
              padding: "20px",
            }}
          >
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
