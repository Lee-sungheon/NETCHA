import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const options = {
  colors: ["rgb(255, 47, 110)"],
  fontStyle: "Noto Sans KR",
  fontSizes: [10, 30],
  fontWeight: "bold",
  padding: 10,
  rotationAngles: [0, 0],
  rotations: 0,
};

const Wordcloud = ({ words }) => {
  return (
    <ReactWordcloud options={options} words={words}/>
  );
}

export default Wordcloud;