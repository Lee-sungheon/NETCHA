import { useState, useRef, useEffect } from 'react'

export default function useSizeElement() {
  const elementRef = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log(elementRef)
    if (elementRef.current.clientWidth) {
      setWidth(elementRef.current.clientWidth);
    }
  }, [elementRef]);

  return { width, elementRef };
}