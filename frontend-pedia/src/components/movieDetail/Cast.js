import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cast.scss';

const ActorList = ({ actors }) => {
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
      {actors.map((actor) => (
        <div className="actorWrapper">
          <div className="actorImage"></div>
          <div className="actorBlock">
            <div className="actorName">{actor.name}</div>
            <div className="actorRole">{actor.role}</div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

const Cast = ({ actors }) => {
  return (
    <div className="actors">
      <div className="infoHeader">출연/제작</div>
      <ActorList actors={actors} />
    </div>
  );
};

export default Cast;
