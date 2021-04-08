const BasicInformation = ({ movie }) => {
  return (
    <div className="basicInfo">
      <div className="infoHeader">기본정보</div>
      <div className="infoContent">
        <div>{movie.movie_info.title}</div>
        <div>
          {movie.movie_info.open}.{movie.movie_info.country}.
          {movie.movie_info.ganre}
        </div>
        <div>{movie.movie_info.time}분</div>
        <br />
        <div>{movie.movie_info.scenario}</div>
      </div>
    </div>
  );
};
export default BasicInformation;
