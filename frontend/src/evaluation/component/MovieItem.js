import{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  customOverlay: {
    width: '100%', 
    height: 'auto', 
    position: 'absolute', 
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  title: {
    padding: theme.spacing(2, 0, 1, 1),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    color: 'white',
  },
  rating: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  likeBox: {
    borderTop: '0.5px solid gray',
    paddingTop: theme.spacing(2),
    margin: theme.spacing(2, 2),
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
}));

export default function MovieItem({tile}) {
  const customClasses = useStyles();
  const [ isFinish, setIsFinish ] = useState(false)
  const [ isHover, setIsHover ] = useState(false)
  const [ score, setScore ] = useState(5)
  let tmpScore = 5
  function setHover() {
    console.log(isFinish)
    if (isFinish){
      setIsHover(true)
    } else {
      setIsHover(false)
      setScore(5)
    }
  }
  function onChange(e, v) {
    if(v>0){
      tmpScore = v
    }
  }
  function onClick() {
    setIsFinish(true);
    if (tmpScore === score){
      setIsFinish(false)
    }
    setScore(tmpScore);
  }
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={setHover}
      style={isHover ? {border: '1px solid white', position: 'relative'} : {position: 'relative'}}
    >
      <img 
        src={tile.img} 
        alt={tile.title} 
        style={{width: '100%'}} 
      />
      <div 
        className={customClasses.customOverlay}
        style={isHover ? {visibility: 'visible'} : {visibility: 'hidden'}}
      >
        <Typography 
          variant="subtitle1"
          className={customClasses.title}
        >
          {tile.title}
        </Typography>
        <div className={customClasses.rating} >
          <Rating 
            name="size-large" 
            size="large" 
            precision={0.5} 
            onChangeActive={onChange}
            onClick={onClick}
            value={score}
          />
        </div>
        <div className={customClasses.likeBox}>
          <FavoriteIcon style={{margin: '0 2px 4px 2px', color: 'red'}} />
          <Typography 
            variant="subtitle2"
          >
            찜하기
          </Typography>
        </div>
      </div>
    </div>
  )
}