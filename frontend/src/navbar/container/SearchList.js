import { useState, useEffect } from 'react';
import '../../likeList/container/LikeList.scss';
import MovieList from '../../likeList/component/movieList/MovieList';
import MovieItem from '../../likeList/component/movieList/MovieItem';
import { actions } from "../state";
import { useSelector, useDispatch } from 'react-redux';


let repeat = []
export default function SearchList({location}) {
  const [tabNo, setTabNo] = useState(5);
  const [searchList, setSearchList] = useState([]);
  const movieLists = useSelector(state => state.search.movieLists);
  const dispatch = useDispatch();

  useEffect(() => {
    checkWindowInner()
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
    return () => {
      window.removeEventListener('resize', function() {
        checkWindowInner()
      });
    }
  }, [])

  useEffect(() => {
    dispatch(actions.requestMovieList());
  }, [location])

  useEffect(() => {
    repeat = []
    for (let i=0 ; i<=movieLists.length/tabNo ; i++){
      repeat.push(movieLists.slice(i*tabNo, (i+1)*tabNo))
    }
    setSearchList([...repeat])
  }, [movieLists, tabNo])
  
  function checkWindowInner() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 1280) {
      setTabNo(6)
    } else if (windowInnerWidth > 1023) {
      setTabNo(5)
    } else if (windowInnerWidth > 767) {
      setTabNo(4)
    } else if (windowInnerWidth > 600) {
      setTabNo(3)
    } else {
      setTabNo(2)
    }
  }

  return (
    <>
      <div className='like__container'>
        <div className="like__title"> {location.search.slice(3,)} 검색 결과</div>
        {searchList.map((item, idx) => (
          <div id={`slider-${idx}`} className='like__container' key={idx}>
            <MovieList idx={`slider-${idx}`} num={tabNo}>
              {item.map((movie, index) => (
                <MovieItem movie={movie} idx={index} key={index}>
                </MovieItem>
              ))}
          </MovieList>
        </div>
        ))}
      </div>
    </>
  )
}