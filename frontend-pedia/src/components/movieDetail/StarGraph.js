import Graph from '../../components/common/Graph';

export default function StarGraph() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="starGraph">
      <div className="infoHeader">
        별점 그래프<div>평균 ★3.8</div>
      </div>
      <Graph rankArr={arr} />
    </div>
  );
}
