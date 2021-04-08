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


export default function CountryFilter({countryText, ganreText, setCountryText, user}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function changeCountryText(e) {
    setCountryText(e.target.innerText);
    handleClose();
    if (e.target.innerText!=='국가'){
      if (ganreText !== '장르'){
        dispatch(actions.setMovieList([]));
        dispatch(actions.requestFilterCountryGanreMovieList(e.target.innerText, ganreText, 0, user.seq));
      } else{
        dispatch(actions.setMovieList([]));
        dispatch(actions.requestFilterCountryMovieList(e.target.innerText, 0, user.seq));
      }
    }
  }
  return (
    <div className="movie-filter__top-bar__left__filter1" style={{padding: '0 10px', marginLeft: '10px', width: '85px'}}>
      <div style={{ fontSize: '0.5vw' }}>{countryText}</div>
      <IconButton
        aria-controls="customized-ganre"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        style={{ padding: 0, position:"absolute", left: '248px' }}
      >
        <ArrowDropDownIcon style={{padding: 0}} />
      </IconButton>
      <StyledMenu
        id="customized-ganre"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {COUNTRYS.map((country, idx)=>(
          <StyledMenuItem key={idx}>
            <ListItemText primary={country} onClick={changeCountryText}/>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

const COUNTRYS = [
  '국가',
  '프랑스',
  '오스트리아',
  '일본',
  '오스트레일리아',
  '태국',
  '인도네시아',
  '이스라엘',
  '포르투칼',
  '러시아',
  '콜롬비아',
  '아이슬란드',
  '네덜란드',
  '스위스',
  '아르헨티나',
  '이탈리아',
  '독일',
  '싱가포르',
  '베트남',
  '인도',
  '체코',
  '미국',
  '폴란드',
  '중국',
  '사우디아라비아',
  '네팔',
  '스페인',
  '터키',
  '필리핀',
  '남아프리카공화국',
  '이집트',
  '우크라이나',
  '캐나다',
  '벨기에',
  '영국',
  '홍콩',
  '대한민국',
  '북한',
]