const CountryAndGenreList = ({ data }) => {
  return (
    <div className="gcWrap">
      <ul className="gcUl">
        {data.map((data) => {
          return (
            <li className="gcli">
              <div className="gcBoldText">{data.name}</div>
              <div className="gcText">{data.count}편</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountryAndGenreList;
