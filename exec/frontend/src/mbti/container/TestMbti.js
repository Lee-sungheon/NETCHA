import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TestMbtiList from "../component/TestMbtiItem";
import { useHistory } from "react-router";
import { navActions } from "../../navbar/state";
import { useDispatch } from "react-redux";

import "./Mbti.css";

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
    fontFamily: "Bazzi",
  },
  mbti_div: {
    background: "rgb(0, 0, 0, 1)",
    height: "35vw",
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
    marginBottom: "3vw",
    fontSize: "2vw",
    textAlign: "center",
  },
}));

export default function TestMBTI(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navActions.headerToggle(false));

    return () => {
      dispatch(navActions.headerToggle(true));
    };
  }, [dispatch]);
  const [choiceList, setChoiceList] = useState({ choice: [] });
  const onChoice = (data) => {
    setChoiceList({
      ...choiceList,
      choice: choiceList.choice.concat(data),
    });
  };
  useEffect(() => {
    if (choiceList.choice.length === 12) {
      history.push({
        pathname: "/mbtiresult",
        state: { choiceList: choiceList },
      });
    }
    return () => {};
  }, [choiceList]);
  const questionList = [
    {
      no: "1",
      question: "라면을 끓일 때의 타입은?",
      choice_1: "나는 세계 최고 라면 레시피를 가지고 있지.",
      choice_2: "오늘은 어떻게 해먹을까~ 백선생님 나와라!",
    },
    {
      no: "2",
      question: "다음 중 내가 더 자주 사용하는 말은?",
      choice_1: "아니..! 현실적으로 좀 생각해 보라구.",
      choice_2: "아니..! 상상을 좀 해보라구.",
    },
    {
      no: "3",
      question: "다음 중 가장 마음에 드는 박명수 어록은?",
      choice_1: "늦었다고 생각할 때가 늦은거다. 그러니 지금 당장 시작해라.",
      choice_2: "죽음과 결혼은 미룰수록 좋다.",
    },
    {
      no: "4",
      question: "항마력이 필요한 오글거리는 연예인 짤을 봤을 때 드는 생각은?",
      choice_1: "극.혐.",
      choice_2: "연예인도..먹고 살기..힘들구나..",
    },
    {
      no: "5",
      question: "버스 1분뒤 도착 예정 친구가 뛴다면?",
      choice_1:
        "야, 빠ㅣㅣ리 와 !!! (누구보다 빠르게 남들과는 다르게..feat.아웃사이더)",
      choice_2:
        "친구야 인생은 길어 다음거 타자.. (거북아 그 속도론 멀리 못 도망가..feat.다비치)",
    },
    {
      no: "6",
      question: '"너, 이번에 새로 나온 아이폰12 봤어?" 라고 친구가 묻는다면?',
      choice_1: "미니는 손바닥보다 좀 작더라! 아무튼 사고싶음.",
      choice_2: "존예! 그린은 진짜 쌈무색 같던데 맘에 듦.",
    },
    {
      no: "7",
      question: "쇼핑을 할 때 자주 듣는 말은?",
      choice_1: "제발 좀 사라, 사!",
      choice_2: "아니 또 산다구..?",
    },
    {
      no: "8",
      question: "갑자기 폭우가 내릴 때 당신이 드는 생각은?",
      choice_1: "우산 사야하나? 돈 아까워...",
      choice_2: "축축하고 젖는 거 최악이야...",
    },
    {
      no: "9",
      question: "충고를 들었을 때 나의 반응은?",
      choice_1: '너가 뭘 아냐며 따지고 싶지만 귀찮으니까 "응, 그래~"',
      choice_2: '노력하고 있는 날 몰라줘서 속상하지만 "고마워! 도움이 되었어."',
    },
    {
      no: "10",
      question: '"4차산업혁명"이라는 단어를 처음 들었을 때 드는 생각은?',
      choice_1: "이상한 말 또 하나 늘었네;; ㅋ",
      choice_2: "뭔가 있어보이고 멋있다;; ㅎ",
    },
    {
      no: "11",
      question: "오늘은 휴일 저녁. 무엇을 했나요?",
      choice_1: "아, 오늘 이것저것 하려 했는데 못함",
      choice_2: "아, 오늘 하루 보람차게 숨쉬었다.",
    },
    {
      no: "12",
      question: "대화를 할 때 주로 맡는 포지션은?",
      choice_1: "왜왜왜오애왜왜 어디서 어떻게??웅??? (나는야 물음표 살인마)",
      choice_2: "아니.. 근데.. 내가 오늘..진짜... (나는야 설명충)",
    },
  ];

  return (
    <div>
      <div className={classes.mbti_back}>
        <div className={classes.mbti_page}>
          <header>
            <div>
              <img
                src={"../images/netcha.png"}
                style={{ height: "90px", marginRight: "10px" }}
                alt="netcha"
              />
            </div>
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
