import React from 'react';
import './Content.scss';
import BasicInformation from '../basicInformation/BasicInformation';
import DetailInformation from '../detailInformation/DetailInformation';
import SimilarMovie from '../similarMovie/SimilarMovie';
import IconCross from '../Icons/IconCross';

const Content = ({ movie, onClose, tabNo, setTabNumber }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={tabNo === 2 || tabNo === 3 ? 
          { 'backgroundImage': `url(${ movie.imageUrl !== 'default' ? movie.imageUrl : "/images/netchar2.png" })`, filter: 'blur(6px)', opacity: 0.2 }
          : { 'backgroundImage': `url(${ movie.imageUrl !== 'default' ? movie.imageUrl : "/images/netchar2.png" })`}}
      />
    </div>
    <div className="content__area">
      <div className="content__title">{movie.title}</div>
      <div className="content__rating_container">
        <div className="content__rating_container__rating_box">
          <div className="content__rating_container__rating_box__title">평균 별점</div>
          <div className="content__rating_container__rating_box__rating">4.7</div>
        </div>
        <div className="content__rating_container__information">
          { movie.rating !== undefined &&  <img style={{width: '12%', margin: '0 5px'}} src={`/images/${movie.rating.slice(0,2)}.svg`} />} 
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
);

export default Content;
