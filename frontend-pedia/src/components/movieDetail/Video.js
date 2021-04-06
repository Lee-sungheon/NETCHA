import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import * as moviesApi from '../../lib/api/movies';
import { Link } from 'react-router-dom';
// import YTSearch from "youtube-api-search";
const API_KEY = "AIzaSyAF-_uQIzruH-iViU7EJXBvFhQrh39iDDU";

const Video = (videoNo) => {
  const [loading, setLoading] = useState(null);
  const [youtubeList, setYoutubeList] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

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

  const getVideoInfo = async () => {
    try {
      setLoading(true);
      const response = await moviesApi.hasVideoURL(videoNo);
      setVideoInfo(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVideoInfo();
  }, []);

  useEffect(() => {
    if (videoInfo === false) {
      searchYouTube({ keyword: "아이언맨", max: 2, key: API_KEY });
    }
  }, [videoInfo]);

  const searchYouTube = async ({ keyword, max, key }, callback) => {
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${keyword}&maxResults=${max}&type=video&videoEmbeddable=true`
      )
      .then((response) => {
        console.log(response);
        setYoutubeList(response.items);
      });
  };

  if (youtubeList) {
    var arr = [];
    youtubeList.forEach((info) => {
      arr.push({
        url: `https://www.youtube.com/watch?v=${info.id.videoId}`,
        thumnail: info.snippet.thumnails.default.url,
      });
    });
    setVideoInfo(arr);
  }

  return (
    <div className="video">
      <div className="infoHeader">동영상</div>
      <Slider {...settings}>
        {videoInfo &&
          videoInfo.map((video, index) => {
            return (
              <Link to={video.url}>
                <div className="smallVideoBox" key={index}>
                  <img
                    className="thumnail"
                    alt={video.url}
                    src={
                      video.thumnail === "default"
                        ? "../../images/defaultPoster.png"
                        : video.thumnail
                    }
                  />
                </div>
              </Link>
            );
          })}
      </Slider>
    </div>
  );
};

export default Video;
