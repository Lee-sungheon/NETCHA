import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function ChangePassword() {
  const history = useHistory();

  const [inputData, setInputData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onPasswordHandeler = (e) => {
    setInputData({ ...inputData, password: e.target.value });
  };
  const onNewPasswordHandeler = (e) => {
    setInputData({ ...inputData, newPassword: e.target.value });
  };
  const onConfirmPasswordHandeler = (e) => {
    setInputData({ ...inputData, confrimPassword: e.target.value });
  };

  const changePassword = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/account",
    });
  };
  return (
    <div>
      <h1>비밀번호 변경</h1>
      <div>
        <label>현재비밀번호 : </label>
        <input
          id="password"
          type="password"
          value={inputData.password}
          onChange={onPasswordHandeler}
        ></input>
        <br />
        <label>새 비밀번호 : </label>
        <input
          id="newpassword"
          type="password"
          value={inputData.newPassword}
          onChange={onNewPasswordHandeler}
        ></input>
        <br />
        <label>비밀번호확인 : </label>
        <input
          id="confirmpassword"
          type="password"
          value={inputData.confirmPassword}
          onChange={onConfirmPasswordHandeler}
        ></input>
        <br />
        <button onClick={changePassword}>비밀번호 변경</button>
      </div>
    </div>
  );
}
