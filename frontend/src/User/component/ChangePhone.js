import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state";
import axios from "axios";

export default function ChangePhone() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId, phone } = useSelector((state) => ({
    userId: state.user.userData.member.userId,
    phone: state.user.userData.member.phone,
  }));
  const [inputData, setInputData] = useState({
    phone: phone,
  });
  const onPhoneHandeler = (e) => {
    setInputData({ ...inputData, phone: e.target.value });
  };

  const changePhone = (e) => {
    e.preventDefault();
    const body = {
      phone: inputData.phone,
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
      <div
        style={{
          fontFamily: "Bazzi",
          margin: "100px auto",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>전화번호 변경</h1>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label>새 전화번호 : </label>
          <input
            id="phone"
            type="tel"
            value={inputData.phone}
            onChange={onPhoneHandeler}
          ></input>

          <br />
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <button
              style={{
                backgroundColor: "#bdbdbd",
                border: "none",
                borderRadius: "3px",
                color: "white",
                height: "30px",
              }}
              onClick={changePhone}
            >
              전화번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
