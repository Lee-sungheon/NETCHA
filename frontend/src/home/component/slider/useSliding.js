import { useState, useRef, useEffect } from 'react'

const PADDINGS = 110;

export default function useSliding(elementWidth, countElements) {
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0);
  const [cardWidth, setCardWidth] = useState(false);
  
  function checkWindowInner() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth < 600){
      setCardWidth(true)
    } else if (windowInnerWidth < 767) {
      setCardWidth(true)
    } else if (windowInnerWidth < 1023) {
      setCardWidth(true)
    } else if (windowInnerWidth < 1280) {
      setCardWidth(true)
    } else {
      setCardWidth(false)
    }
  }

  useEffect(() => {
    checkWindowInner()
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
    const containerWidth = containerRef.current.clientWidth - PADDINGS;
    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  }, [containerRef, elementWidth, cardWidth]);


  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  }

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth)
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  const hasPrev = distance < 0;
  const hasNext = (viewed + totalInViewport) < countElements;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
}