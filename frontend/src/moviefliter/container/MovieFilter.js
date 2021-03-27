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


const StyledMenu = withStyles({
  paper: {
    backgroundColor: "black",
    border: "1px solid #d3d4d5",
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
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    checkWindowInner()
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
  }, [])
  repeat = []
  for (let i=0 ; i<=movies.length/tabNo ; i++){
    repeat.push(movies.slice(i*tabNo, (i+1)*tabNo))
  }
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
  function changeFilterText(e) {
    setFilterText(e.target.innerText);
    handleClose();
  }
  return (
    <>
      <div className="movie-filter__top-bar__container">
        <div className="movie-filter__top-bar__area">
          <div className="movie-filter__top-bar__left"></div>
          <div className="movie-filter__top-bar__right" >
            <Link to={"/"}><div className="movie-filter__top-bar__button1" ><DehazeIcon /></div></Link>
            <Link to={"/movielist"}>
              <div className="movie-filter__top-bar__button2">
                <ViewModuleIcon style={{margin: '0 15px'}}/>
                <span style={{ fontSize: '0.5vw' }}>{filterText}</span>
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="inherit"
                  onClick={handleClick}
                  style={{ paddingLeft: "0px", position:'absolute', right:'40px', justifyContent: 'flex-end' }}
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
                    {/* <Link
                      to="/account"
                      style={{
                        color: "white",
                      }}
                    > */}
                    <ListItemText primary="추천 콘텐츠" onClick={(changeFilterText)}/>
                    {/* </Link> */}
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="출시일순" onClick={changeFilterText}/>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="오름차순(ㄱ-Z)" onClick={changeFilterText}/>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemText primary="내림차순(Z-ㄱ)" onClick={changeFilterText}/>
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='movie-filter__container'>
        {repeat.map((item, idx) => (
          <div id={`slider-${idx}`} className='like__container' key={idx}>
            <MovieList idx={`slider-${idx}`} num={tabNo}>
              {item.map((movie, index) => (
                <MovieItem movie={movie} idx={index} key={movie.id}>
                </MovieItem>
              ))}
          </MovieList>
        </div>
        ))}
      </div>
    </>
  )

}

const movies = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 7,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 8,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 9,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 10,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 11,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 12,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 7,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 8,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 9,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 10,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 11,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 12,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 7,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 8,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 9,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 10,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 11,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 12,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
];
