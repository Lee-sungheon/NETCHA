import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import MovieListContext from './context';
import MovieWrapper from './MovieWrapper';
import './MovieList.scss';
import Content from '../../../home/component/content/Content';

const MovieList = ({ children, activeSlide, idx, num }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const [tabNo, setTabNo] = useState(1);
  const [escapeLeft, setEscapeLeft] = useState(false);
  const [escapeRight, setEscapeRight] = useState(false);
  const [sliderWrap, setSliderWrap] = useState('');

  const setTabNumber = num => {
    setTabNo(num);
  };
  const handleSelect = movie => {
    setCurrentSlide(movie);
    leaveSetShow();
  };

  const handleClose = () => {
    setCurrentSlide(null);
    setTabNo(1);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    currentSlide,
    num,
    escapeLeft, 
    setEscapeLeft,
    escapeRight, 
    setEscapeRight
  };
  useEffect(() => {
    setSliderWrap(document.getElementById(idx))
  }, [idx])
  const enterSetShow = (e) => {
    if (e.target.className === 'slider__container'){
      if (sliderWrap){
        sliderWrap.style.zIndex = 1
      }
    } 
    else {
      if (!currentSlide) {
        if (sliderWrap){
          sliderWrap.style.zIndex = 10
        }
      }
    }
  }

  const leaveSetShow = () => {
    if (sliderWrap){
      sliderWrap.style.zIndex = 1
    }
  }

  return (
    <MovieListContext.Provider value={contextValue}>
      <MovieWrapper idx={idx}>
        <div
          className={cx('slider', 
          { 'slider--open': currentSlide != null },
          { 'slider--left': !escapeLeft || currentSlide != null},
          { 'slider--right': !escapeRight || currentSlide != null }
          )}>
          <div 
            // ref={containerRef} 
            className="slider__container"
            onMouseMove={enterSetShow}
            onMouseLeave={leaveSetShow}
          >
              {children}
          </div>
        </div>
      </MovieWrapper>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} tabNo={tabNo} setTabNumber={setTabNumber} />}
    </MovieListContext.Provider>
  );
};

export default MovieList;