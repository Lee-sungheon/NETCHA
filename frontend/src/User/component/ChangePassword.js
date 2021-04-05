import React, { useState } from "react";
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
      <div
        style={{
          fontFamily: "Bazzi",
          margin: "100px auto",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>비밀번호 변경</h1>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <label
              style={{
                width: "100px",
              }}
            >
              현재비밀번호 :{" "}
            </label>
            <input
              id="password"
              type="password"
              value={inputData.password}
              onChange={onPasswordHandeler}
            ></input>
          </div>
          <br />
          <div>
            <label>새 비밀번호 : </label>
            <input
              id="newpassword"
              type="password"
              value={inputData.newPassword}
              onChange={onNewPasswordHandeler}
            ></input>
          </div>
          <br />
          <div>
            <label>비밀번호확인 : </label>
            <input
              id="confirmpassword"
              type="password"
              value={inputData.confirmPassword}
              onChange={onConfirmPasswordHandeler}
            ></input>
          </div>
          <br />
          <div>
            <button
              style={{
                backgroundColor: "#bdbdbd",
                border: "none",
                borderRadius: "3px",
                color: "white",
                height: "30px",
              }}
              onClick={changePassword}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
