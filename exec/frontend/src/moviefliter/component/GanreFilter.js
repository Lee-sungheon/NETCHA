import { useState } from 'react'; 
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux';
import { actions } from "../state";

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "black",
    width: "107px",
    border: "1px solid #d3d4d5",
    margin: "1px 0",
    maxHeight: "200px",
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
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


export default function GanreFilter({ganreText, countryText, setGanreText, user}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function changeGanreText(e) {
    setGanreText(e.target.innerText);
    handleClose();
    if(e.target.innerText !== '장르'){
      if(countryText !== '국가') {
        dispatch(actions.setMovieList([]));
        dispatch(actions.requestFilterCountryGanreMovieList(countryText, e.target.innerText, 0, user.seq));
      } else{
        dispatch(actions.setMovieList([]));
        dispatch(actions.requestFilterGanreMovieList(e.target.innerText, 0, user.seq));
      }
    }
  }
  return (
    <div className="movie-filter__top-bar__left__filter1" style={{padding: '0 10px', width: '85px'}}>
      <div style={{ fontSize: '0.5vw' }}>{ganreText}</div>
      <IconButton
        aria-controls="customized-ganre"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        style={{ padding: 0, position:"absolute", left: '130px'}}
      >
        <ArrowDropDownIcon style={{padding: 0}} />
      </IconButton>
      <StyledMenu
        id="customized-ganre"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {GANRES.map((ganre, idx)=>(
          <StyledMenuItem key={idx}>
            <ListItemText primary={ganre} onClick={changeGanreText}/>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

const GANRES = [
  '장르',
  '어드벤처', 
  '공포',
  '활극', 
  '뮤지컬', 
  '뮤직', 
  '문화', 
  '인권', 
  '아동', 
  '액션', 
  '드라마', 
  '멜로', 
  '청춘영화', 
  '반공/분단', 
  '사회물(경향)', 
  '로드무비', 
  '판타지', 
  '전쟁', 
  '범죄', 
  '모험', 
  '애니메이션', 
  '군사', 
  '스릴러', 
  '스포츠', 
  '애정', 
  '전기', 
  '신파', 
  '코메디', 
  '기록', 
  '하이틴(고교)', 
  '교육', 
  '문예', 
  '역사', 
  '과학', 
  '무협', 
  '미스터리', 
  'SF',
  '자연ㆍ환경', 
  '로맨스', 
  '연쇄극', 
  '인물', 
  '갱스터', 
  '가족', 
  '시대극/사극', 
  '재난', 
  '실험', 
  '첩보', 
  '느와르', 
  '종교', 
  '사회', 
  '옴니버스', 
  '서부'
]