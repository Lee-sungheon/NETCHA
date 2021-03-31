import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function ChangePhone() {
  const history = useHistory();

  const [inputData, setInputData] = useState({
    phone: "",
  });
  const onPhoneHandeler = (e) => {
    setInputData({ ...inputData, phone: e.target.value });
  };

  const changePhone = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/account",
    });
  };
  return (
    <div>
      <h1>전화번호 변경</h1>
      <div>
        <label>새 전화번호 : </label>
        <input
          id="phone"
          type="tel"
          value={inputData.phone}
          onChange={onPhoneHandeler}
        ></input>

        <br />
        <button onClick={changePhone}>전화번호 변경</button>
      </div>
    </div>
  );
}
