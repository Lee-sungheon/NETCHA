import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TestMbtiList from "../component/TestMbtiItem";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

export default function MbtiResult(props) {
  const location = useLocation();
  const [MBTI, setMBTI] = useState({
    N_S: "",
    J_P: "",
    T_F: "",
    E_I: "",
  });

  useEffect(() => {
    const ChoiceList = location.state.choiceList.choice;
    console.log(ChoiceList);
    let N_S = 0;
    let J_P = 0;
    let T_F = 0;
    let E_I = 0;
    // N_S
    if (ChoiceList[0] == 1) {
      N_S += 1;
    }
    if (ChoiceList[1] == 2) {
      N_S += 1;
    }
    if (ChoiceList[5] == 2) {
      N_S += 1;
    }
    if (N_S >= 2) {
      N_S = "N";
    } else {
      N_S = "S";
    }
    // J_P
    if (ChoiceList[2] == 1) {
      J_P += 1;
    }
    if (ChoiceList[4] == 1) {
      J_P += 1;
    }
    if (ChoiceList[10] == 2) {
      J_P += 1;
    }
    if (J_P >= 2) {
      J_P = "J";
    } else {
      J_P = "P";
    }

    //T_F
    if (ChoiceList[3] == 1) {
      T_F += 1;
    }
    if (ChoiceList[7] == 1) {
      T_F += 1;
    }
    if (ChoiceList[9] == 1) {
      T_F += 1;
    }
    if (T_F >= 2) {
      T_F = "T";
    } else {
      T_F = "F";
    }

    //E_I
    if (ChoiceList[6] == 2) {
      E_I += 1;
    }
    if (ChoiceList[8] == 1) {
      E_I += 1;
    }
    if (ChoiceList[11] == 2) {
      E_I += 1;
    }
    if (E_I >= 2) {
      E_I = "E";
    } else {
      E_I = "I";
    }

    console.log(N_S, E_I, J_P, T_F);
    setMBTI({ ...MBTI, N_S: N_S, E_I: E_I, J_P: J_P, T_F: T_F });
    return () => {};
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        MBTI 결과
      </div>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        {MBTI.E_I + MBTI.N_S + MBTI.T_F + MBTI.J_P}
      </div>
    </div>
  );
}
