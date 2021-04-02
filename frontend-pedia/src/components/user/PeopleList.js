import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PeopleList.scss";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "5px",
  slidesToShow: 1,
  arrows: true,
  speed: 500,
  rows: 3,
  slidesPerRow: 1,
};

const PeopleList = ({ data, error, loading }) => {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  return (
    <>
      {!loading && data && (
        <div className="peopleSlider">
          <Slider {...settings}>
            {data.map((data) => {
              return (
                <div className="actorWrap">
                  <img className="actorImage" src={data.image} alt={data.name} title={data.name} />
                  <div className="actorName">
                    <span>{data.name}</span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
};

export default PeopleList;
