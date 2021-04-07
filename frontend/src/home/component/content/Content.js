import React from 'react';
import './Content.scss';
import BasicInformation from '../basicInformation/BasicInformation';
import DetailInformation from '../detailInformation/DetailInformation';
import SimilarMovie from '../similarMovie/SimilarMovie';
import IconCross from '../Icons/IconCross';
import ReactHlsPlayer from "react-hls-player";
import { useSelector } from 'react-redux';
import SoundButton from "../banner/SoundButton";


const Content = ({ movie, onClose, tabNo, setTabNumber }) => {
  const bufferTime = useSelector(state => state.home.bufferTime);
  const SoundToggle = () => {
    const player = document.getElementById("player3");
    player.muted = !player.muted;
  };
  return (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      {(tabNo === 2 || tabNo === 3) && <div
        className="content__background__image"
        style={{'backgroundImage': `url(${ movie.imageUrl[0] !== 'default' ? movie.imageUrl[1]? movie.imageUrl[1] : movie.imageUrl[0] : "/images/netchar2.png" })`, filter: 'blur(6px)', opacity: 0.2 }}
      />}
      {tabNo === 1 && <div className="content__background_image">
        <ReactHlsPlayer
          id="player3"
          src={`https://dre3xbpyohrg0.cloudfront.net/MOVIE${movie.no}/MOVIE${movie.no}.m3u8`}
          autoPlay={true}
          muted
          height="99%"
          style={{
            position: 'absolute',
            zIndex: "1",
            top: 0,
            right: -60,
          }}
          hlsConfig={{
            startPosition: bufferTime,
          }}
        ></ReactHlsPlayer>
        <div
          onClick={SoundToggle}
          style={{
            color: "black",
            position: "absolute",
            bottom: "7vw",
            right: "2vw",
            zIndex: 99,
          }}
        >
          <SoundButton />
        </div>
      </div>}
    </div>
    <div className="content__area">
      <div className="content__title">{movie.title}</div>
      <div className="content__rating_container">
        <div className="content__rating_container__rating_box">
          <div className="content__rating_container__rating_box__title">평균 별점</div>
          <div className="content__rating_container__rating_box__rating">{movie.avgRank}</div>
        </div>
        <div className="content__rating_container__information">
          { movie.rating !== "" && movie.rating !== undefined && <img style={{width: '12%', margin: '0 5px'}} src={`/images/${RATING[movie.rating.slice(0,2)]}.svg`} alt="" />} 
          <span>{movie.time}분</span>
        </div>
      </div>
      {tabNo === 1 && <div className="content__area__container1">
        <BasicInformation movie={movie} />
      </div>}
      {tabNo === 2 && <div className="content__area__container2">
        <DetailInformation movie={movie} />
      </div>}
      {tabNo === 3 && <div className="content__area__container3">
        <SimilarMovie movie={movie} />
      </div>}
    </div>
    <button className="content__close" onClick={onClose}>
      <IconCross />
    </button>
    <div className="content__tab-box">
      <div 
        className={tabNo === 1 ? "content__tab-box__item-avtive":"content__tab-box__item"}
        onClick={() => {setTabNumber(1)}}
      >
        기본정보
      </div>
      <div 
        className={tabNo === 2 ? "content__tab-box__item-avtive":"content__tab-box__item"}
        onClick={() => {setTabNumber(2)}}
      >
        상세정보
      </div>
      <div 
        className={tabNo === 3 ? "content__tab-box__item-avtive":"content__tab-box__item"}
        onClick={() => {setTabNumber(3)}}
      >
        비슷한 작품
      </div>
    </div>
  </div>
)};

export default Content;

const RATING = {
  '15' : '15',
  '12' : '12',
  '18' : '18',
  전체 : 'all',
  모두 : 'all',
  고등 : '15',
  미성 : '18',
  연소 : '18',
  중학 : '12',
  청소 : '18',
}