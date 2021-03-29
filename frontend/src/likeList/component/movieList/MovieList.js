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
  const [sliderWrap1, setSliderWrap1] = useState('');
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
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    currentSlide,
  };
  useEffect(() => {
    setSliderWrap1(document.getElementById(idx))
    setSliderWrap(document.getElementById(`wrapperidx${idx}`))
  }, [idx])
  const enterSetShow = (e) => {
    // 맨왼쪽, 맨오른쪽 아이템 트랜지션 변경
    if (e.target.id % num === 0) {
      setEscapeLeft(true)
    } else {
      setEscapeLeft(false)
    }
    if (e.target.id % num === num-1) {
      setEscapeRight(true)
    } else {
      setEscapeRight(false)
    }
    if (e.target.className === 'slider__container'){
      let id = Number(idx.split('-')[1]) + 1
      let index = `slider-${id}`
      sliderWrap1.style.zIndex = 1
      sliderWrap.style.padding = '30px 0'
      while (true){
        index = `slider-${id}`
        const sliderWrap2 = document.getElementById(index)
        if (sliderWrap2) {
          sliderWrap2.style.top = 0
        } else {
          break
        }
        id += 1
      }
      return
    } 
    else {
      if (!currentSlide) {
        let id = Number(idx.split('-')[1]) + 1
        let index = `slider-${id}`
        sliderWrap1.style.zIndex = 10
        sliderWrap.style.padding = '30px 0 70px 0'
        while (true){
          const sliderWrap2 = document.getElementById(index)
          index = `slider-${id}` 
          if (sliderWrap2) {
            sliderWrap2.style.top = '-171px'
          } else {
            break
          }
          id += 1
        }
      }
    }
  }

  const leaveSetShow = (e) => {
    sliderWrap1.style.zIndex = 1
    let id = Number(idx.split('-')[1]) + 1
    let index = `slider-${id}`
    sliderWrap1.style.zIndex = 1
    sliderWrap.style.padding = '30px 0'
    while (true){
      index = `slider-${id}`
      const sliderWrap2 = document.getElementById(index)
      if (sliderWrap2) {
        sliderWrap2.style.top = 0
      } else {
        break
      }
      id += 1
    }
  }

  return (
    <MovieListContext.Provider value={contextValue}>
      <MovieWrapper idx={idx}>
        <div
          className={cx('slider', 
          { 'slider--open': currentSlide != null }, 
          { 'slider--left': !escapeLeft},
          { 'slider--right': !escapeRight}
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