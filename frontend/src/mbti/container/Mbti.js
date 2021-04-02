import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import "./Mbti.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actions } from "../../user/state";

const useStyles = makeStyles((theme) => ({
  mbti_back: {
    // backgroundImage:
    //   "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  mbti_page: {
    background: "rgb(0, 0, 0, 0.5)",
  },
  mbti_div_back: {
    margin: "0 auto",
    width: "60vw",
    maxWidth: "1100px",
    height: "100vh",
    paddingTop: "10vw",
  },
  mbti_div: {
    // backgroundColor: "white",
    // background: "rgb(0, 0, 0, 0.7)",
    height: "35vw",
    // width: "100%",
    padding: "3vw 3.5vw",
    color: "white",
    textAlign: "center",
    fontSize: "2.5vw",
  },
}));

export default function Mbti(props) {
  const location = useLocation();
  const { mbti, userId } = useSelector((state) => ({
    mbti: state.user.userData.member.mbti,
    userId: state.user.userData.member.userId,
  }));
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    mbti: mbti,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      mbti: event.target.value,
    });
  };
  const changeMbti = (e) => {
    e.preventDefault();
    const body = {
      mbti: state.mbti,
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
          });
        history.push({
          pathname: "/account",
        });
      });
  };
  return (
    <div>
      <div className={classes.mbti_back}>
        <div className={classes.mbti_page}>
          <div className={classes.mbti_div_back}>
            <div className={classes.mbti_div}>
              <div
                style={{
                  display: "flex",
                  margin: "20px auto",
                  fontSize: "2vw",
                  // backgroundColor: "white",
                  height: "20vw",
                }}
              >
                <div
                  style={{
                    margin: "2vw",
                    height: "15vw",
                    width: "50%",
                    color: "black",
                    border: "solid white 1px",
                    padding: "3vw",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "2vw",
                    fontFamily: "Bazzi",
                  }}
                >
                  직접선택하기
                  <div>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      style={{
                        backgroundColor: "white",
                        marginTop: "3vw",
                        width: "7vw",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        MBTI
                      </InputLabel>
                      <Select
                        native
                        value={state.mbti}
                        onChange={handleChange}
                        label="MBTI"
                        inputProps={{
                          name: "MBTI",
                          id: "outlined-age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value="ENFJ">ENFJ</option>
                        <option value="ENFP">ENFP</option>
                        <option value="ENTJ">ENTJ</option>
                        <option value="ENTP">ENTP</option>
                        <option value="ESFJ">ESFJ</option>
                        <option value="ESFP">ESFP</option>
                        <option value="ESTJ">ESTJ</option>
                        <option value="ESTP">ESTP</option>
                        <option value="INFJ">INFJ</option>
                        <option value="INFP">INFP</option>
                        <option value="INTJ">INTJ</option>
                        <option value="INTP">INTP</option>
                        <option value="ISFJ">ISFJ</option>
                        <option value="ISFP">ISFP</option>
                        <option value="ISTJ">ISTJ</option>
                        <option value="ISTP">ISTP</option>
                      </Select>
                    </FormControl>
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      backgroundColor: "white",
                      marginTop: "1vw",
                      fontFamily: "Bazzi",
                    }}
                    onClick={changeMbti}
                  >
                    확인
                  </Button>
                </div>
                <div
                  style={{
                    margin: "2vw",
                    height: "15vw",
                    width: "50%",
                    border: "solid 1px white",
                    height: "15vw",
                    padding: "3vw",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "2vw",
                  }}
                >
                  <Link
                    to="/testmbti"
                    style={{
                      height: "10vw",
                      width: "50%",
                      listStyle: "none",
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{
                        backgroundColor: "white",
                        marginTop: "4.5vw",
                        width: "15vw",
                        height: "5vw",
                        fontFamily: "Bazzi",
                        fontSize: "1.7vw",
                      }}
                    >
                      MBTI테스트하기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
