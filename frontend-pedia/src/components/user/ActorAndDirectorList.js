import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ActorAndDirectorList.scss";
import PersonImage from './PersonImage'

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

const ActorAndDirectorList = ({data}) => {
  return (
    <div className="peopleSlider">
      <Slider {...settings}>
        {data.map((data) => {
          return (
            <div className="actorWrap">
              <PersonImage name={data.name} />
              <div className="actorName">
                <span>{data.name}</span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default ActorAndDirectorList;