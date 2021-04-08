import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import * as moviesApi from '../../lib/api/movies';
import './Video.scss';

const API_KEY = [
  'AIzaSyBdpUamxH0rDlC-AO_HJCLM8xtPJypugXg', // 얘는 할당량 초과 킨데 확인용임
  'AIzaSyCu17720nhALyT7pA4npHg2RBWCzLPyQd8',
  'AIzaSyAF-_uQIzruH-iViU7EJXBvFhQrh39iDDU',
  'AIzaSyAOlnLY5aF3MRjLUt7ypOpPYKSMH77AqLs',
  'AIzaSyD69rNy2R94_GPn8nd6G4KFnPBR5pQCzJY',
  'AIzaSyAYPthRyg1esUMpmRWr0S3UdUoe1iV3ftQ',
];

const Video = ({ movieNo, movieTitle }) => {
  const [loading, setLoading] = useState(null);
  const [index, setIndex] = useState(0);
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

  const getVideoInfo = async () => {
    try {
      setLoading(true);
      const response = await moviesApi.listMovieVideos(movieNo);
      // console.dir(response);
      if (response.data.length === 0) {
        searchYouTube({
          keyword: movieTitle + ' 예고편',
          max: 3,
          key: API_KEY[index],
        });
      } else {
        setVideoInfo(response.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideoInfo();
  }, [index]);

  const searchYouTube = async ({ keyword, max, key }, callback) => {
    console.log('유튜브 API 요청');
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${keyword}&maxResults=${max}&type=video&videoEmbeddable=true`
      )
      .then((response) => {
        console.log('유튜브 API 성공');
        var arr = [];
        response.data.items.forEach((info) => {
          arr.push({
            url: `https://www.youtube.com/watch?v=${info.id.videoId}`,
            thumbnail: info.snippet.thumbnails.default.url,
            title: info.snippet.title,
            movieNo: movieNo.toString(),
          });
        });
        setVideoInfo(arr);
        // 백엔드로 유튜브 데이터 전송
        try {
          console.log('백엔드로 전송');
          moviesApi.updateMovieVideos(arr);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('index: ' + index);
        if (index < API_KEY.length) {
          console.log('다음 API 키 사용');
          setIndex(index + 1);
          getVideoInfo(index + 1);
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
