import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TestMbtiList from "../component/TestMbtiItem";

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

export default function TestMBTI(props) {
  const classes = useStyles();
  const [choiceList, setChoiceList] = useState({ choice: [] });
  const onChoice = (data) => {
    console.log(data);
    setChoiceList({ ...choiceList, choice: choiceList.choice.concat(data) });
  };

  const questionList = [
    {
      no: "1",
      question: "question_1",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "2",
      question: "question_2",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "3",
      question: "question_3",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "4",
      question: "question_4",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "5",
      question: "question_5",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "6",
      question: "question_6",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "7",
      question: "question_7",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "8",
      question: "question_8",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "9",
      question: "question_9",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "10",
      question: "question_10",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "11",
      question: "question_11",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
    {
      no: "12",
      question: "question_12",
      choice_1: "choice_1",
      choice_2: "choice_2",
    },
  ];

  useEffect(() => {
    props.toggleIsHeader(false);
    return () => {
      props.toggleIsHeader(true);
    };
  }, []);

  return (
    <div>
      <div className={classes.mbti_back}>
        <div className={classes.mbti_page}>
          <header>
            <Link to={"/"}>
              <img
                src={"../images/netcha.png"}
                style={{ height: "90px", marginRight: "10px" }}
                alt="netcha"
              />
            </Link>
          </header>
          <div className={classes.mbti_div_back}>
            <div className={classes.mbti_div}>
              <TestMbtiList questionList={questionList} onChoice={onChoice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
