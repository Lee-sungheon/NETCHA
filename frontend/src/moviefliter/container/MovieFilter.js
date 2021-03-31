import './MovieFilter.scss'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import MovieList from '../../likeList/component/movieList/MovieList';
import MovieItem from '../../likeList/component/movieList/MovieItem';
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../home/state";
import CircularProgress from '@material-ui/core/CircularProgress';
import GanreFilter from '../component/GanreFilter.js';
import CountryFilter from '../component/CountryFilter.js';

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "black",
    width: "200px",
    border: "1px solid #d3d4d5",
    margin: "1px 0"
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "black",
    color: "white",
    height: "25px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}))(MenuItem);

let repeat = []
export default function MovieFilter() {
  const [tabNo, setTabNo] = useState(5);
  const [filterText, setFilterText] = useState("추천 콘텐츠")
  const [anchorEl, setAnchorEl] = useState(null);
  const movieLists = useSelector(state => state.home.movieLists);
  const [filterList, setFilterList] = useState([]);
  const isInfinite = useSelector(state => state.home.isInfinite);
  const isLoading = useSelector(state => state.home.isLoading);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    checkWindowInner()
    if (movieLists.length === 0 && filterText === "추천 콘텐츠"){
      dispatch(actions.requestMovieList());
    }
    window.addEventListener("resize", function(){
      checkWindowInner()
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", function(){
        checkWindowInner()
      });
    };
  }, []);

  useEffect(() => {
    repeat = []
    for (let i=0 ; i<=movieLists.length/tabNo ; i++){
      repeat.push(movieLists.slice(i*tabNo, (i+1)*tabNo))
    }
    setFilterList([...repeat])
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

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !isInfinite) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      dispatch(actions.requestAddMovieList());
    }
   };

  function changeFilterText(e) {
    setFilterText(e.target.innerText);
    handleClose();
    let filteredList = []
    if (e.target.innerText === '오름차순(A-ㅎ)') {
      // 오름차순(A-ㅎ))순 정렬
      filteredList = movieLists.slice().sort(function(a, b) {
        return a['title'] < b['title'] ? -1 : a['title'] > b['title']  ? 1 : 0;
      });
      // '내림차순(ㅎ-A)' 정렬
    } else if (e.target.innerText === '내림차순(ㅎ-A)') {
      filteredList = movieLists.slice().sort(function(a, b) {
        return a['title'] > b['title'] ? -1 : a['title'] < b['title']  ? 1 : 0;
      });
    } else if (e.target.innerText === '추천 콘텐츠') {
      // 추천 콘텐츠 정렬
      filteredList = movieLists.slice();
    } else if (e.target.innerText === '출시일순') {
      // 출시일 정렬
      filteredList = movieLists.slice();
    }
    repeat = []
    for (let i=0 ; i<=filteredList.length/tabNo ; i++){
      repeat.push(filteredList.slice(i*tabNo, (i+1)*tabNo))
    }
    setFilterList([...repeat])
  }
  return (
    <>
      <div className="movie-filter__top-bar__container">
        <div className="movie-filter__top-bar__area">
          <div className="movie-filter__top-bar__left">
            <GanreFilter />
            <CountryFilter />
          </div>
          <div className="movie-filter__top-bar__right" >
            <Link to={"/"}><div className="movie-filter__top-bar__right__button1" ><DehazeIcon /></div></Link>
            <Link to={"/movielist"}>
              <div className="movie-filter__top-bar__right__button2">
                <ViewModuleIcon style={{margin: '0 15px'}}/>
                <span style={{ fontSize: '0.5vw' }}>{filterText}</span>
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="inherit"
                  onClick={handleClick}
                  style={{ paddingLeft: "0px", position:'absolute', right:'3.5%', justifyContent: 'flex-end' }}
                >
                  <ArrowDropDownIcon style={{padding: '0'}} />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemText primary="추천 콘텐츠" onClick={changeFilterText}/>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="출시일순" onClick={changeFilterText}/>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="오름차순(A-ㅎ)" onClick={changeFilterText}/>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="내림차순(ㅎ-A)" onClick={changeFilterText}/>
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='movie-filter__container'>
        { isLoading &&
          <div style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress color="secondary" />
          </div>
        }
        { !isLoading && filterList.map((item, idx) => (
          <div id={`slider-${idx}`} className='like__container' key={idx}>
            <MovieList idx={`slider-${idx}`} num={tabNo}>
              {item.map((movie, index) => (
                <MovieItem movie={movie} idx={index} key={index}>
                </MovieItem>
              ))}
            </MovieList>
          </div>
        ))}
        {isInfinite && <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color="secondary" />
        </div>}
      </div>
    </>
  )
}