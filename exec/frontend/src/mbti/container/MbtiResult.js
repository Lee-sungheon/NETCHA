import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../../user/state";
import axios from "axios";
import { navActions } from "../../navbar/state";
import { homeActions } from "../../home/state";

import "./Mbti.css";

const useStyles = makeStyles((theme) => ({
  mbti_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  mbti_page: {
    background: "rgb(0, 0, 0, 0.5)",
    fontFamily: "Bazzi",
  },
  mbti_div_back: {
    margin: "0 auto",
    width: "60vw",
    maxWidth: "900px",
    height: "100vh",
    paddingTop: "10vw",
  },
  mbti_div: {
    background: "rgb(0, 0, 0, 1)",
    height: "25vw",
    // width: "100%",
    padding: "3vw 3.5vw",
    color: "white",
    textAlign: "center",
    fontSize: "2.5vw",
    border: "1px solid black",
    borderRadius: "10%",
  },
  mbti_button: {
    color: "#42a5f5",
    "&:hover": {
      textDecoration: "underline",
    },
    fontSize: "2vw",
  },
}));

export default function MbtiResult(props) {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => ({
    userId: state.user.userData.member.userId,
  }));
  const [mbtiImg, setMbtiImg] = useState({
    mbtiimg: "",
  });

  const [MBTI, setMBTI] = useState({
    N_S: "",
    J_P: "",
    T_F: "",
    E_I: "",
  });
  useEffect(() => {
    dispatch(navActions.headerToggle(false));

    return () => {
      dispatch(navActions.headerToggle(true));
    };
  }, [dispatch]);
  useEffect(() => {
    setMbtiImg({
      ...mbtiImg,
      mbtiimg: "images/" + MBTI.E_I + MBTI.N_S + MBTI.T_F + MBTI.J_P + ".png",
    });

    const body = {
      mbti: MBTI.E_I + MBTI.N_S + MBTI.T_F + MBTI.J_P,
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
            dispatch(homeActions.setMbtiMovieList([]));
            dispatch(actions.userInfo(res.data.data));
          });
      });
  }, [MBTI]);
  useEffect(() => {
    const ChoiceList = location.state.choiceList.choice;
    let N_S = 0;
    let J_P = 0;
    let T_F = 0;
    let E_I = 0;
    // N_S
    if (ChoiceList[0] === 1) {
      N_S += 1;
    }
    if (ChoiceList[1] === 2) {
      N_S += 1;
    }
    if (ChoiceList[5] === 2) {
      N_S += 1;
    }
    if (N_S >= 2) {
      N_S = "N";
    } else {
      N_S = "S";
    }
    // J_P
    if (ChoiceList[2] === 1) {
      J_P += 1;
    }
    if (ChoiceList[4] === 1) {
      J_P += 1;
    }
    if (ChoiceList[10] === 2) {
      J_P += 1;
    }
    if (J_P >= 2) {
      J_P = "J";
    } else {
      J_P = "P";
    }

    //T_F
    if (ChoiceList[3] === 1) {
      T_F += 1;
    }
    if (ChoiceList[7] === 1) {
      T_F += 1;
    }
    if (ChoiceList[9] === 1) {
      T_F += 1;
    }
    if (T_F >= 2) {
      T_F = "T";
    } else {
      T_F = "F";
    }

    //E_I
    if (ChoiceList[6] === 2) {
      E_I += 1;
    }
    if (ChoiceList[8] === 1) {
      E_I += 1;
    }
    if (ChoiceList[11] === 2) {
      E_I += 1;
    }
    if (E_I >= 2) {
      E_I = "E";
    } else {
      E_I = "I";
    }

    setMBTI({ ...MBTI, N_S: N_S, E_I: E_I, J_P: J_P, T_F: T_F });
    return () => {};
  }, []);
  return (
    <div>
      <div className={classes.mbti_back}>
        <div className={classes.mbti_page}>
          <div className={classes.mbti_div_back}>
            <div className={classes.mbti_div}>
              당신의 MBTI 테스트 결과는 <br />
              {mbtiImg ? (
                <img
                  alt={mbtiImg.mbtiimg}
                  src={mbtiImg.mbtiimg}
                  style={{
                    width: "40vw",
                    marginTop: "2vw",
                  }}
                />
              ) : null}
              {/* {MBTI.E_I + MBTI.N_S + MBTI.T_F + MBTI.J_P} 입니다. */}
            </div>
            <div
              style={{
                backgroundColor: "none",
                marginTop: "-4vw",
                textAlign: "center",
                color: "white",
                fontStyle: "none",
              }}
            >
              <Link to="/home" className={classes.mbti_button}>
                메인페이지로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
