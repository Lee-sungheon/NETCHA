import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state";

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
      .post(
        "netcha/user/changeUser",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        axios
          .post("netcha/user/info", body.userId, {
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
      <h1>닉네임 변경</h1>
      <div>
        <label>새 닉네임 : </label>
        <input
          id="phone"
          type="tel"
          value={inputData.nickname}
          onChange={onNicknameHandeler}
        ></input>
        <br />
        <button onClick={changeNickname}>닉네임 변경</button>
      </div>
    </div>
  );
}
