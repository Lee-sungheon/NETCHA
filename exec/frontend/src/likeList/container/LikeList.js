import { useState, useEffect } from 'react';
import './LikeList.scss';
import MovieList from '../component/movieList/MovieList';
import MovieItem from '../component/movieList/MovieItem';
import { likeactions } from "../state";
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';


let repeat = []
let pageNum = 1;
let loadingPage = false;

export default function LikeList() {
  const [tabNo, setTabNo] = useState(5);
  const [likeList, setLikeList] = useState([]);
  const movieLists = useSelector(state => state.like.movieLists);
  const isLoading = useSelector(state => state.like.isLoading);
  const isInfinite = useSelector(state => state.like.isInfinite);
  const isInfiniteEnd = useSelector(state => state.like.infiniteEnd);
  const user = useSelector(state => state.user.userData.member);
  const dispatch = useDispatch();

  useEffect(() => {
    checkWindowInner()
    dispatch(likeactions.requestMovieList(0, user.seq));
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
    window.scrollTo(0, 0);
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        // 페이지 끝에 도달하면 추가 데이터를 받아온다
        dispatch(likeactions.requestAddMovieList(pageNum, user.seq));
        if (!loadingPage) {
          pageNum += 1;
        }
        loadingPage = true;
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('resize', function(){
        checkWindowInner()
      });
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])
  
  useEffect(() => {
    repeat = [];
    for (let i=0 ; i<=movieLists.length/tabNo ; i++){
      repeat.push(movieLists.slice(i*tabNo, (i+1)*tabNo));
    }
    setLikeList([...repeat]);
    loadingPage = false;
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
          <div style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      {movieLists.length === 0 &&
        <div style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <DesktopAccessDisabledIcon/>
        <span style={{marginLeft: '8px'}}>찜한 영화가 없습니다!</span>
      </div>
      }
      {isInfinite && !isLoading && !isInfiniteEnd && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {isInfiniteEnd && movieLists.length > 0 &&
        <div style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh'}}>
          <DesktopAccessDisabledIcon/>
          <span style={{marginLeft: '8px'}}>더이상 불러올 데이터가 없습니다!</span>
        </div>
      }
      {movieLists.length <= tabNo*2 &&
        <div style={{height: '40vh'}}></div>
      }
    </>
  )
}