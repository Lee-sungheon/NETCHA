import React from 'react'
import './SliderWrapper.scss'

const SliderWrapper = ({ children, idx }) => (
  <div className="slider-wrapper" id={`wrapperidx${idx}`}>
    {children}
  </div>
);

export default SliderWrapper;
