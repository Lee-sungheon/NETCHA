import React from "react";
import StarGraph from "../../components/user/StarGraph";

export default function StarGraphContainer() {
  var highestStar = 0;
  const arr = [2, 3, 1, 1, 3, 8, 4, 7, 13, 11];
  var sum = 0;
  var calc = 0.0;
  var score = 0;
  const getAvg = (arr) => {
    var max = 0;
    for (let i = 0; i < arr.length; i++) {
      score += 0.5;
      sum += arr[i];
      calc += score * arr[i];
      if (max < arr[i]) {
        max = arr[i];
        highestStar = score;
      }
    }

    return calc / sum;
  };
  var avg = getAvg(arr);

  return (
    <StarGraph data={arr} sum={sum} avg={avg.toFixed(1)} max={highestStar} />
  );
}
