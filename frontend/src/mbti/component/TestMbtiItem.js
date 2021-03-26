import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mbti_back: {
    backgroundImage:
      "url(https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/b4d69ed1-965f-49d2-abc2-02d4d0ae6ffb/KR-ko-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    marginTop: "-64px",
  },
  mbti_page: {
    background: "rgb(0, 0, 0, 0.5)",
  },
  mbti_div_back: {
    margin: "0 auto",
    width: "80vw",
    maxWidth: "900px",
    height: "100vh",
    paddingTop: "10px",
  },
  mbti_div: {
    background: "rgb(0, 0, 0, 1)",
    height: "35vw",
    // width: "100%",
    padding: "60px 68px",
  },
  mbti_div_: {
    color: "#424242",
    marginBottom: "25px",
    fontSize: "1.5vw",
    textAlign: "center",
  },
  mbti_div_question: {
    color: "#64ffda",
    marginBottom: "25px",
    marginBottom: "3vw",
    fontSize: "2vw",
    textAlign: "center",
  },
}));

export default function TestMbtiItem(props) {
  const [questionNum, setQuestionNum] = useState(0);
  const classes = useStyles();

  const onClickChoice_1 = (e) => {
    e.preventDefault();
    console.log(e.target);
    props.onChoice(1);
    setQuestionNum(questionNum + 1);
  };
  const onClickChoice = (e) => {
    console.log(e.target);
    props.onChoice(2);
    // setQuestionNum(questionNum++);
  };

  return (
    <div>
      <h1 className={classes.mbti_div_}>
        {props.questionList[questionNum].no}/12
      </h1>
      <h1 className={classes.mbti_div_question}>
        {props.questionList[questionNum].question}
      </h1>
      <div
        style={{
          backgroundColor: "#424242",
          textAlign: "center",
          padding: "2.5vw",
          borderRadius: "0.5vw",
        }}
        onClick={onClickChoice_1}
        value="1"
      >
        <span
          style={{
            color: "white",
            fontSize: "1.5vw",
          }}
          value="1"
        >
          {props.questionList[questionNum].choice_1}
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "1vw",
        }}
        value="1"
      >
        <div>
          <span
            style={{
              color: "#424242",
              fontSize: "2vw",
            }}
          >
            or
          </span>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#424242",
          textAlign: "center",
          padding: "2.5vw",
          borderRadius: "0.5vw",
        }}
        onClick={onClickChoice}
        value="2"
      >
        <div>
          <span
            style={{
              color: "white",
              fontSize: "1.5vw",
            }}
          >
            {props.questionList[questionNum].choice_2}
          </span>
        </div>
      </div>
    </div>
  );
}
