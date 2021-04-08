import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state";
import "../../font/font.css";
import "./ChangeNickname.scss";

export default function ChangeNickname() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userId, nickname } = useSelector((state) => ({
    userId: state.user.userData.member.userId,
    nickname: state.user.userData.member.nickname,
  }));
  const [inputData, setInputData] = useState({
    nickname: nickname,
  });
  const onNicknameHandeler = (e) => {
    setInputData({ ...inputData, nickname: e.target.value });
  };

  const changeNickname = (e) => {
    e.preventDefault();
    const body = {
      nickname: inputData.nickname,
      userId: userId,
    };
    axios
      .post("netcha/user/changeUser", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        axios
          .get("netcha/user/info", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            dispatch(actions.userInfo(res.data.data));
            history.push({
              pathname: "/account",
            });
          });
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
        <h1>닉네임 변경</h1>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label>새 닉네임 : </label>
          <input
            id="phone"
            type="tel"
            value={inputData.nickname}
            onChange={onNicknameHandeler}
          ></input>
          <br />
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <button className="button" style={{}} onClick={changeNickname}>
              닉네임 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
