import React from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';

const Content = ({ movie, onClose }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'backgroundImage': `url(${movie.imageBg})` }}
      />
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.title}</div>
        <div className="content__description">
          2027년, 전 세계 모든 여자가 임신 능력을 상실한 시대. 아들이 죽은 후 삶의 의지를 잃은 테오 앞에 20년 만에 나타난 전 부인 줄리안은 그에게 기적적으로 임신한 소녀 키를 부탁한다.
        </div>
        <div style={{display:'flex'}}>
          <div className="content__information__title">
            감독
          </div>
          <div className="content__information__content">
            알폰소 쿠아론
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div className="content__information__title">
            감독
          </div>
          <div className="content__information__content">
            알폰소 쿠아론
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div className="content__information__title">
            감독
          </div>
          <div className="content__information__content">
            알폰소 쿠아론
          </div>
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
