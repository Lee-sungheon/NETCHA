import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PeopleList.scss";

export default function ActorList({ data }) {
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
  return (
    <div className="peopleSlider">
      <Slider {...settings}>
        {data.map((data) => {
          return (
            <div className="actorWrap">
                <img className="actorImage" src="/images/profileIcon.jpg" />
              {/* <span className="actorImageWrap">
              </span> */}
              <div className="actorName">{data.name}</div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
