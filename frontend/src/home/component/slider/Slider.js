import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'

const Slider = ({ children, activeSlide, title, idx }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const [showButton, setShowButton] = useState(true);
  const [escapeLeft, setEscapeLeft] = useState(false);
  const [escapeRight, setEscapeRight] = useState(false);
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
  };

  const handleClose = () => {
    setCurrentSlide(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };
  
  const sliderWrap1 = document.getElementById(idx)
  const sliderWrap = document.getElementById(`wrapperidx${idx}`)
  const enterSetShow = (e) => {
    if (e.clientX < 300) {
      setEscapeLeft(true)
    } else {
      setEscapeLeft(false)
    }
    if (e.clientX > e.view.innerWidth-300) {
      setEscapeRight(true)
    } else {
      setEscapeRight(false)
    }
    if (e.clientX < 47 || e.clientX > e.view.innerWidth-47 || e.target.className === 'slider__container'){
      if (showButton === false){
        setShowButton(true)
      }
      let id = Number(idx.split('-')[1]) + 1
      let index = `slider-${id}`
      sliderWrap1.style.zIndex = 1
      sliderWrap.style.padding = '20px 0'
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
      if (showButton === true){
        setShowButton(false)
      }
      if (!currentSlide) {
        let id = Number(idx.split('-')[1]) + 1
        let index = `slider-${id}`
        sliderWrap1.style.zIndex = 10
        sliderWrap.style.padding = '20px 0 70px 0'
        while (true){
          const sliderWrap2 = document.getElementById(index)
          index = `slider-${id}` 
          if (sliderWrap2) {
            sliderWrap2.style.top = '-152px'
          } else {
            break
          }
          id += 1
        }
      }
    }
  }

  const leaveSetShow = (e) => {
    if (showButton === false){
      setShowButton(true)
    }
    sliderWrap1.style.zIndex = 1
    let id = Number(idx.split('-')[1]) + 1
    let index = `slider-${id}`
    sliderWrap1.style.zIndex = 1
    sliderWrap.style.padding = '20px 0'
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
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper idx={idx}>
        <h4 style={{ color: 'white', margin: '0 0 10px 60px' }}>{title}</h4>
        <div
          className={cx('slider', 
          { 'slider--open': currentSlide != null || showButton}, 
          // {'slider--left': !escapeLeft},
          // {'slider--right': !escapeRight}
          )}>
          <div ref={containerRef} 
            className="slider__container" {...slideProps} 
            onMouseMove={enterSetShow}
            onMouseLeave={leaveSetShow}
            onClick={(e) => console.log(e)}
          >
              {children}
          </div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" showButton = {showButton} />}
        {hasNext && <SlideButton onClick={handleNext} type="next" showButton = {showButton} />}
      </SliderWrapper>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} />}
    </SliderContext.Provider>
  );
};

export default Slider;
