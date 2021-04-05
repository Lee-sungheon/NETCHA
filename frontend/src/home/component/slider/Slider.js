import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Content from '../content/Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import { useDispatch } from 'react-redux';
import { actions } from "../../../home/state";
import './Slider.scss'

const Slider = ({ children, activeSlide, title, idx }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const [showButton, setShowButton] = useState(true);
  const [escapeLeft, setEscapeLeft] = useState(false);
  const [escapeRight, setEscapeRight] = useState(false);
  const [tabNo, setTabNo] = useState(1);
  const dispatch = useDispatch();
  const setTabNumber = num => {
    setTabNo(num);
  };
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  } = useSliding(width, React.Children.count(children));

  const handleSelect = movie => {
    setCurrentSlide(movie);
    leaveSetShow();
  };

  const handleClose = () => {
    setCurrentSlide(null);
    dispatch(actions.setValue('bannerToggle', true));
    setTabNo(1);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
    escapeLeft,
    escapeRight,
    setEscapeLeft,
    setEscapeRight,
    
  };
  
  const sliderWrap = document.getElementById(idx)
  const enterSetShow = (e) => {
    if (e.clientX < 47 || e.clientX > e.view.innerWidth-47 || e.target.className === 'slider__container'){   
      if (currentSlide == null) {
        if (showButton === false){
          setShowButton(true);
        }
        if (sliderWrap){
          sliderWrap.style.zIndex = 1;
        }
      }
    }
    else {
      setShowButton(false);
      if (!currentSlide && sliderWrap) {
        sliderWrap.style.zIndex = 10;
      }
    }
  }

  const leaveSetShow = (e) => {
    if (currentSlide == null){
      if (showButton === false){
        setShowButton(true);
      }
      if (sliderWrap){
        sliderWrap.style.zIndex = 1;
      }
    } else {
      setShowButton(false);
    }
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper idx={idx}>
        <h4 style={{ color: 'white', margin: '0 0 10px 4%' }}>{title}</h4>
        <div
          className={cx('slider', 
          { 'slider--open': currentSlide != null}, 
          { 'slider--left': !escapeLeft || currentSlide != null},
          { 'slider--right': !escapeRight || currentSlide != null }
          )}>
          <div ref={containerRef}
            className="slider__container" {...slideProps} 
            onMouseMove={enterSetShow}
            onMouseLeave={leaveSetShow}
          >
              {children}
          </div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" showButton = {showButton} />}
        {hasNext && <SlideButton onClick={handleNext} type="next" showButton = {showButton} />}
      </SliderWrapper>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} tabNo={tabNo} setTabNumber={setTabNumber} />}
    </SliderContext.Provider>
  );
};

export default Slider;
