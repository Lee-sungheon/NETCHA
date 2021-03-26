import Slider from 'react-slick';
import './Gallery.scss';
export default function Gallery() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 1,
    arrows: true,
    speed: 500,
    rows: 1,
    slidesPerRow: 4,
  };
  return (
    <div className="gallery">
      <div className="infoHeader">갤러리</div>
      <Slider {...settings}>
        {imgs.map((img) => (
          <div className="Slider" key={img.id}>
            <img width="125px" height="94px" src={img.url}></img>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const imgs = [
  {
    id: 1,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 3,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 4,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 5,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
  {
    id: 6,
    url:
      'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_360,q_80,w_640/v1576818817/ob8puocgokh3yj7thpdt.jpg',
  },
];
