import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./SignupSection.scss";

export default function SignupSection(props) {
  const inputData = props.inputData;
  const onUserIdHandler = props.onUserIdHandler;
  const onStart = props.onStart;
  return (
    <>
      <section>
        <div className="signup_section_div">
          <div className="signup_section_div_text">
            영화, TV 프로그램을
            <br /> 무제한으로.
          </div>
          <div className="signup_section_div_text2">
            다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
          </div>
          <form className="signup_form">
            <div>
              시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
              주소를 입력하세요.
            </div>
            <div className="signup_form_div">
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
                type="email"
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
    </>
  );
}
