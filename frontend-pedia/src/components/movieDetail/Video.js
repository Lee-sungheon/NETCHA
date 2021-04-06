import axios from 'axios';
import { useState } from 'react';
import Slider from 'react-slick';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyAF-_uQIzruH-iViU7EJXBvFhQrh39iDDU';

const Video = () => {
  const [video, setVideo] = useState(null);

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

  // const searchYouTube = ({ query, max, key }, callback) => {
  //   axios
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${query}&maxResults=${max}&type=video&videoEmbeddable=true`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  // searchYouTube({ query: "아이언맨", max: 2, key: API_KEY });
  return (
    <div className="video">
      <div className="infoHeader">동영상</div>
      <Slider {...settings}></Slider>
    </div>
  );
};

export default Video;
