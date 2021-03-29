import Graph from '../../movieDetail/component/Graph';

export default function StarGraph({data}) {

  return (
    <div className="starGraphWrap">
      <div className="starGraph">
        <Graph rankArr={data} />
      </div>
      <div className="starGraphInfo">
        <ul>
          <li className="starGraphLi">
            <div className="starGraphNum">4.5</div>
            <div className="starGraphTitle">별점 평균</div>
          </li>
          <li className="starGraphLi">
            <div className="starGraphNum">43</div>
            <div className="starGraphTitle">별점 개수</div>
          </li>
          <li className="starGraphLi">
            <div className="starGraphNum">5.0</div>
            <div className="starGraphTitle">많이 준 별점</div>
          </li>
        </ul>
          
      </div>
    </div>
  );
}
