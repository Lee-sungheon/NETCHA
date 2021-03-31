import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import './BasicInformation.scss';

export default function BasicInformation({ movie }) {
  const [ score, setScore ] = useState(null)
  const [ scoreText, setScoreText] = useState('이미 본 작품인가요?')
  function onChange(e, v) {
    if(v>0){
      tmpScore = v
      setScoreText(SCORE_TEXT[v])
    }
    else{
      if (score == null) {
        setScoreText(SCORE_TEXT[null])
      }
    }
  }
  function onClick() {
    console.log(tmpScore)
    if (tmpScore !== null){
      console.log(movie)
      setScore(tmpScore)
    }
  }

  return (
    <>
      <div className="content__description">
        { movie.scenario.slice(0, 235) }
        { movie.scenario.length > 250 && '...'}
        { movie.scenario.length > 250 && <span style={{color: 'white', cursor: 'pointer'}}>
          더보기
        </span>}
      </div>
      <div className="content__information">
        <div className="content__information__title">
          감독
        </div>
        <div className="content__information__content">
          { movie.directors[0] }
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          출연
        </div>
        <div className="content__information__content">
          { movie.casts.slice(0,3).map((member, idx) => (
            <span key={member}>{idx !== 0 && <span>, </span>}{member.split('(')[0]}</span>
          ))}
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          개요
        </div>
        <div className="content__information__content">
          { movie.ganre.slice(0,3).map((gan, idx) => (
            <span key={gan}>{idx !== 0 && <span> • </span>}{gan}</span>
          ))}
          <span> | </span> { movie.country[0] } <span> | </span> {movie.open}년
        </div>
      </div>
      <div className="content__button_box">
        <div style={{width:'100%', display: "flex"}}>
          <div className="content__play_box">
            <PlayArrowIcon className="content__play_box__play-button"/>
            <div className="content__play_box__text">재생</div>
          </div>
          <AddIcon className="content__common-button"/>
          <ThumbUpAltIcon className="content__common-button"/>
          <ThumbDownIcon className="content__common-button"/>
        </div>
      </div>
      <div className="content__score_box">
        <div className="content__score_box__text">{scoreText}</div>
        <div className="content__score_box__score" onClick={onClick}>
          <Rating 
            name="custom-empty"
            precision={0.5} 
            onChangeActive={onChange}
            value={score}
            style={{color: 'white'}}
            emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: 'white'}} />}
          />
        </div>
      </div>
    </>
  )
}

let tmpScore = null
const SCORE_TEXT = {
  null : '이미 본 작품인가요?',
  0.5 : '최악이에요!',
  1 : '싫어요',
  1.5 : '재미없어요',
  2 : '별로에요',
  2.5 : '부족해요',
  3 : '보통이에요',
  3.5 : '볼만해요',
  4 : '재미있어요',
  4.5 : '훌륭해요',
  5 : '최고에요!'
}