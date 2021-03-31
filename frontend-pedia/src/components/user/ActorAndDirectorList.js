import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ActorAndDirectorList.scss";
import PersonImage from "./PersonImage";

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

const ActorAndDirectorList = ({ actors, error, loading }) => {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  return (
    <>
      {!loading && actors && (
        <div className="peopleSlider">
          <Slider {...settings}>
            {actors.map((actor) => {
              return (
                <div className="actorWrap">
                  <PersonImage name={actor.name} />
                  <div className="actorName">
                    <span>{actor.name}</span>
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

export default ActorAndDirectorList;
