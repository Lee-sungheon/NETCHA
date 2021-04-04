import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import "./LoginSection.scss";

export default function LoginForm(props) {
  return (
    <>
      <div className="login_div2">
        <div>
          <span className="login_div2_span">
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
          <span className="login_div2_span">도움이 필요하신가요?</span>
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
    </>
  );
}
