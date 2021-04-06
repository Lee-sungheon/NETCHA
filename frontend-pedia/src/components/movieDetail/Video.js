import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import * as moviesApi from '../../lib/api/movies';
import './Video.scss';

const API_KEY = [
  'AIzaSyCu17720nhALyT7pA4npHg2RBWCzLPyQd8',
  'AIzaSyAF-_uQIzruH-iViU7EJXBvFhQrh39iDDU',
  'AIzaSyAOlnLY5aF3MRjLUt7ypOpPYKSMH77AqLs',
  'AIzaSyD69rNy2R94_GPn8nd6G4KFnPBR5pQCzJY',
  'AIzaSyAYPthRyg1esUMpmRWr0S3UdUoe1iV3ftQ',
];

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

  const TagToString = (str) => {
    str = str.replaceAll('&lt;', '<');
    str = str.replaceAll('&gt;', '>');
    str = str.replaceAll('&quot;', '"');
    str = str.replaceAll('&#39;', "'");
    return str;
  };

  let index = 0;
  const getVideoInfo = async () => {
    try {
      setLoading(true);
      const response = await moviesApi.listMovieVideos(movieNo);
      if (response === null) {
        searchYouTube({
          keyword: '영화 ' + movieTitle,
          max: 3,
          key: API_KEY[index],
        });
      } else {
        setVideoInfo(response.data);
      }
    } catch (e) {
      if (index < API_KEY.length) {
        getVideoInfo(index + 1);
      }
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
        var arr = [];
        response.data.items.forEach((info) => {
          arr.push({
            url: `https://www.youtube.com/watch?v=${info.id.videoId}`,
            thumbnail: info.snippet.thumbnails.default.url,
            title: info.snippet.title,
            movieNo: movieNo,
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
                  <div className="youtubeTitle">{TagToString(video.title)}</div>
                </a>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Video;
