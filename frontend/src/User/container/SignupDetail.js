import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function SignupDetail(props) {
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
            margin: "0 auto",
            width: "100%",
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
                  회원가입
                </h1>
                <form autoComplete="off">
                  <TextField
                    label="이메일 주소"
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
                    type="password"
                    variant="filled"
                    color="secondary"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  />

                  <TextField
                    label="비밀번호확인"
                    type="password"
                    variant="filled"
                    color="secondary"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  />
                  <TextField
                    label="이름"
                    variant="filled"
                    color="secondary"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  />
                  <TextField
                    label="닉네임"
                    variant="filled"
                    color="secondary"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  />
                  <TextField
                    label="전화번호"
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
                    회원가입
                  </Button>
                </form>
                <div
                  style={{
                    display: "flex",
                    margin: "10px 0",
                  }}
                ></div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
