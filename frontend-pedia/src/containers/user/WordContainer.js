import React from "react";
import WordCloud from "../../components/user/WordCloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export default function Wordcloud() {
  return (
    <Wordcloud words={words} />
  );
}

const words = [
    {
      text: '연기력',
      value: 200,
    },
    {
      text: '연기력',
      value: 90,
    },
    {
      text: '배경이 예쁜',
      value: 80,
    },
    {
      text: '카리스마',
      value: 70,
    },
    {
      text: '연기력',
      value: 60,
    },
    {
      text: '블록버스터',
      value: 50,
    },
    {
      text: '연기력',
      value: 40,
    },
    {
      text: '액션',
      value: 30,
    },
    {
      text: '슬픈',
      value: 64,
    },
    {
      text: '웃긴',
      value: 64,
    },
    {
      text: '블록버스터',
      value: 11,
    },
    {
      text: '블록버스터',
      value: 11,
    },
    {
      text: '블록버스터',
      value: 11,
    },
    {
      text: '블록버스터',
      value: 11,
    },
    {
      text: '강렬힌',
      value: 30,
    },
    {
      text: '강렬힌',
      value: 30,
    },
    {
      text: '강렬힌',
      value: 30,
    },
    {
      text: '한국배경',
      value: 17,
    },
    {
      text: '통쾌한',
      value: 55,
    },
    {
      text: '통쾌한',
      value: 55,
    },
    {
      text: '통쾌한',
      value: 55,
    },
    {
      text: '통쾌한',
      value: 55,
    },
    {
      text: '통쾌한',
      value: 55,
    },
    {
      text: '통쾌한',
      value: 55,
    },
  ];