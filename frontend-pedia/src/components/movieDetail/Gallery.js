import Slider from 'react-slick';
import './Gallery.scss';
const Gallery = ({ imgs }) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 1,
    arrows: true,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
  };
  return (
    <div className="gallery">
      <div className="infoHeader">갤러리</div>
      <Slider {...settings}>
        {imgs.map((img, index) => (
          <div className="Slider" key={index}>
            <img alt="movieImg" width="140px" height="90px" src={img=== "default" ? "../../images/defaultImg.png" : img }></img>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
