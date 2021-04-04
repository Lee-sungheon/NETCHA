import Graph from '../../components/common/Graph';

export default function StarGraph({ movieRank, avgRank }) {
  const arr = [
    movieRank['0.5'],
    movieRank['1.0'],
    movieRank['1.5'],
    movieRank['2.0'],
    movieRank['2.5'],
    movieRank['3.0'],
    movieRank['3.5'],
    movieRank['4.0'],
    movieRank['4.5'],
    movieRank['5.0'],
  ];
  return (
    <div className="starGraph">
      <div className="infoHeader">
        별점 그래프<div>평균 ★{avgRank}</div>
      </div>
      <Graph rankArr={arr} />
    </div>
  );
}
