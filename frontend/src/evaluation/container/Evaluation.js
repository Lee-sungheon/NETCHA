import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import MovieItem from '../component/MovieItem';
import GridListTile from '@material-ui/core/GridListTile';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    marginTop: '8px',
    border: '1px solid white',
    height: 7,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'rgb(20, 21, 23)',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 50px 50px 50px',
    paddingTop: '130px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgb(20, 21, 23)',
  },
  progressBox: {
    position: 'fixed',
    paddingTop: '20px',
    zIndex: 100,
    height: '100px',
    width: '100%',
    // backgroundColor: 'rgb(20, 21, 23)',
    background: 'linear-gradient(to top, rgba(18, 18, 18, 0), rgba(18, 18, 18, 0.6) 10%, rgba(18, 18, 18, 0.8) 16%, rgb(18, 18, 18) 29%);',
    
  },
  progressBar: {
    position: 'absolute',
    left: '30%',
    width: '40%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  gridList: {
    height: '100%',
  },
  GridListTileBar: {
    height: '40%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  menu: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
}));


export default function Evaluation() {
  const classes = useStyles();
  const [colsNum, setColsNum] = useState(5);
  useEffect(() => {
    checkWindowInner()
    window.addEventListener('resize', function(){
      checkWindowInner()
    });
  }, [])
  
  function checkWindowInner() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth < 600){
      setColsNum(2)
    } else if (windowInnerWidth < 960) {
      setColsNum(3)
    } else if (windowInnerWidth < 1280) {
      setColsNum(4)
    } else {
      setColsNum(5)
    }
  }

  return (
    <div>
      <div className={classes.progressBox}>
        <Typography 
          className={classes.menu} 
          variant="h5"
        >
          20
        </Typography>
        <Typography 
          className={classes.menu} 
          variant="subtitle2" 
          style={{ color: 'gray', fontWeight: 'bold'}}
        >
          아하, 이런 스타일이시군요!
        </Typography>
        <div className={classes.progressBar}>
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
      </div>
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={colsNum} spacing={35}>
          {tileData.map((tile) => (
            <GridListTile key={tile.title}>
              <MovieItem tile={tile}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}


const tileData = [
  {
    img: 'https://an2-img.amz.wtchn.net/image/v1/watcha/image/upload/c_fill,h_400,q_80,w_280/v1466398085/c8v66gndnoud4lhcyyzh.jpg',
    title: '성난 변호사',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/pci1ArYW7oJ2eyTo2NMYEKHHiCP.jpg',
    title: '가브리엘의 지옥 파트 2',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg',
    title: '보랏 속편',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/3hO6DIGRBaJQj2NLEYBMwpcz88D.jpg',
    title: '쇼생크 탈출',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
    title: '용감한 자가 신부를 데려가리',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg',
    title: '대부',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/oyyUcGwLX7LTFS1pQbLrQpyzIyt.jpg',
    title: '쉰들러 리스트',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/wx1Dxr4UyvN18SyC5GsVWWWtYja.jpg',
    title: '너의 이름은',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/u1L4qxIu5sC2P082uMHYt7Ifvnj.jpg',
    title: '센과 치히로의 행방불명',
    author: 'author',
   },
   {
    img: 'https://image.tmdb.org/t/p/w500/eJ0kCMcqKLBUaHhB9PfOMFu2uim.jpg',
    title: '기생충',
    author: 'author',
   },
];