import "./MovieFilter.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import MovieList from "../../likeList/component/movieList/MovieList";
import MovieItem from "../../likeList/component/movieList/MovieItem";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../state";
import CircularProgress from "@material-ui/core/CircularProgress";
import GanreFilter from "../component/GanreFilter.js";
import CountryFilter from "../component/CountryFilter.js";
import DesktopAccessDisabledIcon from "@material-ui/icons/DesktopAccessDisabled";

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "black",
    width: "200px",
    border: "1px solid #d3d4d5",
    margin: "1px 0",
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

let repeat = [];
let pageNum = 1;
let loadingPage = false;

export default function MovieFilter() {
  const [tabNo, setTabNo] = useState(5);
  const [filterText, setFilterText] = useState("추천 콘텐츠");
  const [countryText, setCountryText] = useState("국가");
  const [ganreText, setGanreText] = useState("장르");
  const [filterList, setFilterList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const homeMovieLists = useSelector((state) => state.home.movieLists);
  const movieLists = useSelector((state) => state.filter.movieLists);
  const isInfinite = useSelector((state) => state.filter.isInfinite);
  const isLoading = useSelector((state) => state.filter.isLoading);
  const isInfiniteEnd = useSelector((state) => state.filter.infiniteEnd);
  const user = useSelector((state) => state.user.userData.member);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 1 >= scrollHeight && !isInfinite) {
        // 페이지 끝에 도달하면 추가 데이터를 받아온다
        if (countryText !== "국가" && ganreText !== "장르") {
          dispatch(
            actions.requestAddCountryGanreMovieList(
              countryText,
              ganreText,
              pageNum,
              user.seq
            )
          );
        } else if (countryText !== "국가") {
          dispatch(
            actions.requestAddCountryMovieList(countryText, pageNum, user.seq)
          );
        } else if (ganreText !== "장르") {
          dispatch(
            actions.requestAddGanreMovieList(ganreText, pageNum, user.seq)
          );
        } else {
          dispatch(actions.requestAddMovieList(pageNum, user.seq));
        }
        if (!loadingPage) {
          pageNum += 1;
        }
        loadingPage = true;
      }
    }
    checkWindowInner();
    if (movieLists.length === 0 && filterText === "추천 콘텐츠") {
      if (homeMovieLists.length > 0) {
        dispatch(actions.setMovieList(homeMovieLists));
      } else {
        dispatch(actions.requestMovieList(0, user.seq));
      }
    }
    pageNum = movieLists.length / 40;
    window.addEventListener("resize", function () {
      checkWindowInner();
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", function () {
        checkWindowInner();
      });
    };
  }, [countryText, ganreText]);

  useEffect(() => {
    repeat = [];
    for (let i = 0; i <= movieLists.length / tabNo; i++) {
      repeat.push(movieLists.slice(i * tabNo, (i + 1) * tabNo));
    }
    pageNum = movieLists.length / 40;
    setFilterList([...repeat]);
    loadingPage = false;
  }, [movieLists, tabNo]);

  function checkWindowInner() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 1280) {
      setTabNo(6);
    } else if (windowInnerWidth > 1023) {
      setTabNo(5);
    } else if (windowInnerWidth > 767) {
      setTabNo(4);
    } else if (windowInnerWidth > 600) {
      setTabNo(3);
    } else {
      setTabNo(2);
    }
  }

  function changeFilterText(e) {
    setFilterText(e.target.innerText);
    handleClose();
    let filteredList = [];
    if (e.target.innerText === "오름차순(A-ㅎ)") {
      // 오름차순(A-ㅎ))순 정렬
      filteredList = movieLists.slice().sort(function (a, b) {
        return a["title"] < b["title"] ? -1 : a["title"] > b["title"] ? 1 : 0;
      });
      // '내림차순(ㅎ-A)' 정렬
    } else if (e.target.innerText === "내림차순(ㅎ-A)") {
      filteredList = movieLists.slice().sort(function (a, b) {
        return a["title"] > b["title"] ? -1 : a["title"] < b["title"] ? 1 : 0;
      });
    } else if (e.target.innerText === "추천 콘텐츠") {
      // 추천 콘텐츠 정렬
      filteredList = movieLists.slice();
    } else if (e.target.innerText === "출시일순") {
      // 출시일 정렬
      filteredList = movieLists.slice().sort(function (a, b) {
        return a["open"] > b["open"] ? -1 : a["open"] < b["open"] ? 1 : 0;
      });
    }
    repeat = [];
    for (let i = 0; i <= filteredList.length / tabNo; i++) {
      repeat.push(filteredList.slice(i * tabNo, (i + 1) * tabNo));
    }
    setFilterList([...repeat]);
  }
  return (
    <>
      <div className="movie-filter__top-bar__container">
        <div className="movie-filter__top-bar__area">
          <div className="movie-filter__top-bar__left">
            <GanreFilter
              ganreText={ganreText}
              setGanreText={setGanreText}
              countryText={countryText}
              user={user}
            />
            <CountryFilter
              countryText={countryText}
              ganreText={ganreText}
              setCountryText={setCountryText}
              user={user}
            />
          </div>
          <div className="movie-filter__top-bar__right">
            <Link to={"/home"}>
              <div className="movie-filter__top-bar__right__button1">
                <DehazeIcon />
              </div>
            </Link>
            <Link to={"/movielist"}>
              <div className="movie-filter__top-bar__right__button2">
                <ViewModuleIcon style={{ margin: "0 15px" }} />
                <span style={{ fontSize: "0.5vw" }}>{filterText}</span>
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="inherit"
                  onClick={handleClick}
                  style={{
                    paddingLeft: "0px",
                    position: "absolute",
                    right: "3.5%",
                    justifyContent: "flex-end",
                  }}
                >
                  <ArrowDropDownIcon style={{ padding: "0" }} />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemText
                      primary="추천 콘텐츠"
                      onClick={changeFilterText}
                    />
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText
                      primary="출시일순"
                      onClick={changeFilterText}
                    />
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText
                      primary="오름차순(A-ㅎ)"
                      onClick={changeFilterText}
                    />
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText
                      primary="내림차순(ㅎ-A)"
                      onClick={changeFilterText}
                    />
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="movie-filter__container">
        {isLoading && (
          <div
            style={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
        {!isLoading &&
          filterList.length !== 1 &&
          filterList.map((item, idx) => (
            <div id={`slider-${idx}`} className="like__container" key={idx}>
              <MovieList idx={`slider-${idx}`} num={tabNo}>
                {item.map((movie, index) => (
                  <MovieItem movie={movie} idx={index} key={index}></MovieItem>
                ))}
              </MovieList>
            </div>
          ))}
        {movieLists.length === 0 && (
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <DesktopAccessDisabledIcon />
            <span style={{ marginLeft: "8px" }}>해당 영화가 없습니다!</span>
          </div>
        )}
        {isInfinite && !isLoading && !isInfiniteEnd && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {isInfiniteEnd && movieLists.length > 0 && (
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5vh",
            }}
          >
            <DesktopAccessDisabledIcon />
            <span style={{ marginLeft: "8px" }}>
              더이상 불러올 데이터가 없습니다!
            </span>
          </div>
        )}
      </div>
      {movieLists.length <= tabNo*2 && <div style={{ height: "40vh" }}></div>}
    </>
  );
}
