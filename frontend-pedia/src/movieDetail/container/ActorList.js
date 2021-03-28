import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ActorList.scss';

export default function ActorList() {
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
    <div className="slider">
      <Slider {...settings}>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">정이삭</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">윤여정</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">스티븐연</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">한예리</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">노엘</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">앨런.S.김</div>
        </div>
        <div>
          <div className="actorImage"></div>
          <div className="actorInfo">앨런.S.김</div>
        </div>
      </Slider>
    </div>
  );
}
