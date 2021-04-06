import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import * as moviesApi from '../../lib/api/movies';

const API_KEY = 'AIzaSyCu17720nhALyT7pA4npHg2RBWCzLPyQd8';

const Video = ({ movieNo, movieTitle }) => {
  const [loading, setLoading] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    speed: 500,
  };

  const getVideoInfo = async () => {
    try {
      setLoading(true);
      const response = await moviesApi.listMovieVideos(movieNo);
      if (response === null) {
        searchYouTube({ keyword: movieTitle, max: 3, key: API_KEY });
      } else {
        setVideoInfo(response.data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVideoInfo();
  }, []);

  const searchYouTube = async ({ keyword, max, key }, callback) => {
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${keyword}&maxResults=${max}&type=video&videoEmbeddable=true`
      )
      .then((response) => {
        console.log(response);

        var arr = [];
        response.data.items.forEach((info) => {
          arr.push({
            url: `https://www.youtube.com/watch?v=${info.id.videoId}`,
            thumbnail: info.snippet.thumbnails.default.url,
          });
        });
        setVideoInfo(arr);

        // 백엔드로 유튜브 데이터 전송
        try {
          moviesApi.updateMovieVideos(arr);
        } catch (e) {
          console.log(e);
        }
      });
  };

  if (loading)
    return <img src="/images/Rolling-50px.svg" style={{ marginLeft: '50%' }} />;

  return (
    <div className="video">
      <div className="infoHeader">동영상</div>
      <Slider {...settings}>
        {videoInfo &&
          videoInfo.map((video, index) => {
            return (
              <div className="smallVideoWrap" key={index}>
                <a href={video.url} target="_blank">
                  <div className="smallVideoBox">
                    <img
                      className="thumbnail"
                      alt="유튜브"
                      title="유튜브 이동"
                      src={video.thumbnail}
                    />
                  </div>
                </a>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Video;
