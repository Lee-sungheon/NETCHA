import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PeopleList.scss';

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '5px',
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
            {data.map((data, index) => {
              return (
                <div className="peopleWrap" key={index}>
                  <img className="peopleImage" src="/images/profileIcon.jpg" alt={data} title={data} />
                  <div className="peoplerName">
                    <span>{data}</span>
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
