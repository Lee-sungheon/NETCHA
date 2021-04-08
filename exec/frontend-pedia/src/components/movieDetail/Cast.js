import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cast.scss';

const ActorList = ({ actors, people }) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 1,
    arrows: true,
    speed: 500,
    rows: 3,
    slidesPerRow: 2,
  };
  return (
    <Slider {...settings}>
      {people.length !== 0 &&
        people.map((arr, index) => (
          <div className="actorWrapper" key={index}>
            <div className="actorImage">
              <img
                className="actorImg"
                src={arr[2] === 'default' ? '/images/profileIcon.jpg' : arr[2]}
                width="53px"
              />
            </div>
            <div className="actorBlock">
              <div className="actorName">{arr[0]}</div>
              <div className="actorRole">{arr[1]}</div>
            </div>
          </div>
        ))}
      {people.length === 0 &&
        actors.map((actor, index) => (
          <div className="actorWrapper" key={index}>
            <div className="actorImage">
              <img src="/images/profileIcon.jpg" width="53px" />
            </div>
            <div className="actorBlock">
              <div className="actorName">{actor}</div>
              <div className="actorRole">출연자</div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

const Cast = ({ actors, people }) => {
  return (
    <div className="actors">
      <div className="infoHeader">출연/제작</div>
      <ActorList actors={actors} people={people} />
    </div>
  );
};

export default Cast;
