import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  layout: { padding: { left: 0, right: 50, top: 0, bottom: 0 } },
  legend: {
    display: false, // label 숨기기
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          color: 'black',
        },
        ticks: {
          maxTicksLimit: 9, //xAxes에 출력할 숫자 30개로 제한
        },
        afterTickToLabelConversion: function (data) {
          let xLabels = data.ticks;
          for (let i = 0; i < xLabels.length; i++) {
            if (i % 2 === 0) xLabels[i] = '';
          }
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          color: 'black',
        },
        ticks: {
          display: false,
          min: 0.5, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
        },
      },
    ],
  },
  responsive: true,
  maintainAspectRatio: true, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
};

const Graph = ({ rankArr }) => {
  let calculatedArr = rankArr;
  //   rankArr.forEach((item) => calculatedArr[item - 1]++);
  let rankColor = [];
  let max = 0;
  let maxIdx = 0;
  for (let i = 10; i >= 0; i--) {
    if (max < rankArr[i]) {
      max = rankArr[i];
      maxIdx = i;
    }
    rankColor[i] = '#FFDD64';
  }
  rankColor[maxIdx] = '#ffa136';
  const data = {
    labels: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
    datasets: [
      {
        backgroundColor: rankColor,
        borderColor: rankColor,
        borderWidth: 1,
        hoverBackgroundColor: rankColor,
        hoverBorderColor: rankColor,
        data: calculatedArr,
      },
    ],
  };

  if (max === 0) return <div> 아직 평가된 별점이 없습니다. </div>;
  return <Bar data={data} options={options} />;
};

export default Graph;
