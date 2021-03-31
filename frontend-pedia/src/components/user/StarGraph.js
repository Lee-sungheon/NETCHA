import Graph from '../common/Graph';
import './StarGraph.scss';

const StarGraph = ({data, sum, avg, max}) => {
  
  return (
    <div className="starGraphWrap">
      <div className="starGraph">
        <Graph rankArr={data} />
      </div>
      <div className="starGraphInfo">
        <ul>
          <li className="starGraphLi">
            <div className="starGraphNum">{avg}</div>
            <div className="starGraphTitle">별점 평균</div>
          </li>
          <li className="starGraphLi">
            <div className="starGraphNum">{sum}</div>
            <div className="starGraphTitle">별점 개수</div>
          </li>
          <li className="starGraphLi">
            <div className="starGraphNum">{max}</div>
            <div className="starGraphTitle">많이 준 별점</div>
          </li>
        </ul>
          
      </div>
    </div>
  );
}

export default StarGraph;