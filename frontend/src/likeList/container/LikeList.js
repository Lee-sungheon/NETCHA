import { useState, useEffect } from 'react';
import './LikeList.scss';
import MovieList from '../component/movieList/MovieList';
import MovieItem from '../component/movieList/MovieItem';
import { actions } from "../state";
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

let repeat = []
export default function LikeList() {
  const [tabNo, setTabNo] = useState(5);
  const [likeList, setLikeList] = useState([]);
  const movieLists = useSelector(state => state.like.movieLists);
  const isLoading = useSelector(state => state.like.isLoading);
  const user = useSelector(state => state.user.userData.member);
  const dispatch = useDispatch();

  useEffect(() => {
    checkWindowInner()
    dispatch(actions.requestMovieList());
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
    return () => {
      window.removeEventListener('resize', function(){
        checkWindowInner()
    });
    }
  }, [])
  
  useEffect(() => {
    repeat = []
    for (let i=0 ; i<=movieLists.length/tabNo ; i++){
      repeat.push(movieLists.slice(i*tabNo, (i+1)*tabNo))
    }
    setLikeList([...repeat])
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
        <div className="like__title">내가 찜한 콘텐츠</div>
        { isLoading &&
          <div style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress color="secondary" />
          </div>
        }
        { !isLoading && likeList.map((item, idx) => (
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