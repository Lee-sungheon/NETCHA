import { useEffect, useState } from 'react';
import Graph from '../../components/common/Graph';
import * as rankApi from '../../lib/api/rank';

const StarGraph = ({ requestData }) => {
  const [movieRank, setMovieRank] = useState(null);
  const [avgRank, setAvgRank] = useState(0);

  const readRank = () => {
    try {
      setTimeout(async () => {
        const response = await rankApi.readRank({
          movieNo: requestData.movieNo,
        });
        const arr = [
          response.data['0.5'],
          response.data['1.0'],
          response.data['1.5'],
          response.data['2.0'],
          response.data['2.5'],
          response.data['3.0'],
          response.data['3.5'],
          response.data['4.0'],
          response.data['4.5'],
          response.data['5.0'],
        ];
        let tempSum = 0;
        let count = 0;
        arr.forEach((data, index) => {
          count += data;
          tempSum += data * ((index + 1) * 0.5);
        });
        setMovieRank(arr);
        if (count !== 0) setAvgRank(tempSum / count);
        else setAvgRank(0);
      }, 500);
    } catch (e) {}
  };

  useEffect(() => {
    readRank();
  }, [requestData]);

  return (
    <>
      {movieRank && (
        <div className="starGraph">
          <div className="infoHeader">
            별점 그래프<div>평균 ★{avgRank.toFixed(1)}</div>
          </div>
          <Graph rankArr={movieRank} />
        </div>
      )}
    </>
  );
};

export default StarGraph;
