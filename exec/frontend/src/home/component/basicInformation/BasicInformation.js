import { useEffect, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { callApiRequestEvaluation, callApiDeleteEvaluation, callApiIncreaseView } from '../../../common/api';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Buttons from './Buttons';
import './BasicInformation.scss';


export default function BasicInformation({ movie }) {
  const [ score, setScore ] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [ scoreText, setScoreText] = useState('이미 본 작품인가요?');
  const user = useSelector(state => state.user.userData.member);
  const token = useSelector(state => state.user.userData.token);
  const history = useHistory();
  useEffect(()=> {
    if (!isFinish) {
      setScore(null);
    }
  }, [isFinish])
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
  function onClick(e) {
    if (e.target.name !== "custom-empty") {
      if (tmpScore === score && isFinish) {
        callApiDeleteEvaluation(user.seq, movie.no)
        setIsFinish(false);
        return;
      }
      if (!isFinish) {
        setIsFinish(true);
      }
      setScore(tmpScore);
      callApiRequestEvaluation(user.seq, movie.no, tmpScore)
    }
  }
  function onCastSearch(e) {
    const text = e.target.innerText;
    history.push(`/search?cast=${text}`);
  }
  function onDirectorSearch(e) {
    const text = e.target.innerText;
    history.push(`/search?director=${text}`);
  }
  function onGanreSearch(e) {
    const text = e.target.innerText;
    history.push(`/search?ganre=${text}`);
  }
  function onCountrySearch(e) {
    const text = e.target.innerText;
    history.push(`/search?country=${text}`);
  }
  const playMovie = () => {
    callApiIncreaseView(movie.no);
    history.push({
      pathname: `/movie/movie-${movie.no}`,
    });
  };

  return (
    <>
      <div className="content__description">
        { movie.scenario.slice(0, 200) }
        '...'
        <span style={{color: 'white', cursor: 'pointer'}}>
          <a style={{color: 'white'}} href={`https://netcha-pedia.netlify.app/movieDetail/${movie.no}/${token}`} target="blank">더보기</a>
        </span>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          감독
        </div>
        <div className="content__information__content">
          <span className="content__information__member" onClick={onDirectorSearch}>{ movie.directors[0] }</span>
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          출연
        </div>
        <div className="content__information__content">
          { movie.casts.slice(0,3).map((member, idx) => (
            <span key={member}>{idx !== 0 && <span>, </span>}
            <span className="content__information__member" onClick={onCastSearch}>
              {member.split('(')[0]}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          개요
        </div>
        <div className="content__information__content">
          { movie.ganre.slice(0,3).map((gan, idx) => (
            <span key={gan}>{idx !== 0 && <span> • </span>}<span className="content__information__member" onClick={onGanreSearch}>{gan}</span></span>
          ))}
          <span> | </span> <span className="content__information__member" onClick={onCountrySearch}>{ movie.country[0] }</span><span> | </span> {movie.open}
        </div>
      </div>
      <div className="content__button_box">
        <div style={{width:'100%', display: "flex"}}>
          <div className="content__play_box" onClick={playMovie}>
            <PlayArrowIcon className="content__play_box__play-button"/>
            <div className="content__play_box__text">재생</div>
          </div>
          <Buttons movie={movie} />
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