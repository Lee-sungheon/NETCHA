const GenreList = ({ data, error, loading }) => {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  return (
    <>
      {!loading && data && (
        <div className="gcWrap">
          <ul className="gcUl">
            {data.ganre.map((ganre, index) => {
              return (
                <li className="gcli" key={index}>
                  <div className="gcBoldText">{ganre}</div>
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

export default GenreList;
