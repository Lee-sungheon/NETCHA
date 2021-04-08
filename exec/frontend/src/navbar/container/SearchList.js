import { useState, useEffect } from 'react';
import '../../likeList/container/LikeList.scss';
import MovieList from '../../likeList/component/movieList/MovieList';
import MovieItem from '../../likeList/component/movieList/MovieItem';
import { actions } from "../state";
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';

let repeat = []
let pageNum = 1;
let loadingPage = false;

export default function SearchList({location}) {
  const [tabNo, setTabNo] = useState(5);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState(location.search.slice(1,).split('='));
  const movieLists = useSelector(state => state.search.movieLists);
  const isLoading = useSelector(state => state.search.isLoading);
  const isInfinite = useSelector((state) => state.search.isInfinite);
  const isInfiniteEnd = useSelector((state) => state.search.infiniteEnd);
  const user = useSelector((state) => state.user.userData.member);
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
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        // 페이지 끝에 도달하면 추가 데이터를 받아온다
        if (search[0] === "country") {
          dispatch(actions.requestAddCountryMovieList(search[1], pageNum, user.seq));
        } else if (search[0] === "ganre") {
          dispatch(actions.requestAddGanreMovieList(search[1], pageNum, user.seq));
        } else if (search[0] === "q") {
          dispatch(actions.requestAddSearchMovieList(search[1], pageNum, user.seq));
        } else if (search[0] === "cast") {
          dispatch(actions.requestAddCastMovieList(search[1], pageNum, user.seq));
        } else if (search[0] === "director") {
          dispatch(actions.requestAddDirectorMovieList(search[1], pageNum, user.seq));
        }
        if (!loadingPage) {
          pageNum += 1;
        }
        loadingPage = true;
      }
    }
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);
    dispatch(actions.setMovieList([]));
    if (search[0] === 'ganre'){
      dispatch(actions.requestGanreMovieList(search[1], 0, user.seq));
      dispatch(actions.trySetText(''));
    } else if (search[0] === 'country'){
      dispatch(actions.requestCountryMovieList(search[1], 0, user.seq));
      dispatch(actions.trySetText(''));
    } else if (search[0] === 'cast'){
      dispatch(actions.requestCastMovieList(search[1], 0, user.seq));
      dispatch(actions.trySetText(''));
    } else if (search[0] === 'director'){
      dispatch(actions.requestDirectorMovieList(search[1], 0, user.seq));
      dispatch(actions.trySetText(''));
    } else{
      dispatch(actions.requestSearchMovieList(search[1], 0, user.seq));
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [search, dispatch, user])

  useEffect(() => {
    setSearch(location.search.slice(1,).split('='))
  }, [location])

  useEffect(() => {
    repeat = []
    for (let i=0 ; i<=movieLists.length/tabNo ; i++){
      repeat.push(movieLists.slice(i*tabNo, (i+1)*tabNo))
    }
    setSearchList([...repeat])
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
        <div className="like__title"> {decodeURI(decodeURIComponent(search[1]))}<span style={{color: 'gray'}}> 검색 결과</span></div>
        { isLoading &&
          <div style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress color="secondary" />
          </div>
        }
        { !isLoading && searchList.map((item, idx) => (
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
      {searchList.movieLists === 0 &&
          <div style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <DesktopAccessDisabledIcon/>
          <span style={{marginLeft: '8px'}}>해당 영화가 없습니다!</span>
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