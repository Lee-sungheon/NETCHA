import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PeopleList.scss";
import PersonImage from './PersonImage'

export default function PeopleList({ data }) {
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
              <PersonImage name={data.name} />
              {/* <img
                className="actorImage"
                src="/images/+${data.name}.jpg`"
                alt={data.name}
                title={data.name}
              /> */}
              {/* <span className="actorImageWrap">
              </span> */}
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
