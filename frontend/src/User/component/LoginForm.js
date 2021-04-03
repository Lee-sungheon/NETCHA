import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function LoginForm(props) {
  const inputData = props.inputData;
  const onUserIdHandler = props.onUserIdHandler;
  const login = props.login;
  const onPasswordHandler = props.onPasswordHandler;
  const classes = props.classes;
  return (
    <>
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
    </>
  );
}
