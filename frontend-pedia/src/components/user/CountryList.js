const CountryList = ({ data, error, loading }) => {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  if (data) {
    console.dir(data);
  }
  return (
    <>
      {!loading && data && (
        <div className="gcWrap">
          <ul className="gcUl">
            {data.country.map((country, index) => {
              return (
                <li className="gcli" key={index}>
                  <div className="gcBoldText">{country}</div>
                  <div className="gcText">{data.count[index]}편</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default CountryList;
