import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./SignupHeader.scss";

export default function SignupHeader(props) {
  return (
    <>
      <header>
        <Link to={"/home"}>
          <img
            src={"../images/netcha.png"}
            style={{ height: "90px", marginRight: "10px" }}
            alt="netcha"
          />
        </Link>
        <Link to="/login" className="header_link">
          <Button variant="contained" className="header_link_button">
            로그인
          </Button>
        </Link>
      </header>
    </>
  );
}
