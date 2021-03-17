import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Login(props) {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
      }}
    >
      <div
        style={{
          background: "rgb(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            margin: "0 auto -236px",
            maxWidth: "450px",
            height: "1000px",
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
                    label="이메일 주소 또는 전화번호"
                    // InputLabelProps={{}}
                    // inputProps={{
                    //   color: "white",
                    // }}
                    InputLabelProps={{
                      color: "secondary",
                    }}
                    variant="filled"
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
                  <a
                    style={{
                      color: "white",
                    }}
                  >
                    지금 가입하세요!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
