import { useState, useRef, useEffect } from 'react'

export default function useSizeElement() {
  const elementRef = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.clientWidth);
    }
  }, [elementRef]);

  return { width, elementRef };
}