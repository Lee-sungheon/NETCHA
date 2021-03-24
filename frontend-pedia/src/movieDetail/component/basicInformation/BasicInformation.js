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
        2027년, 전 세계 모든 여자가 임신 능력을 상실한 시대. 아들이 죽은 후 삶의 의지를 잃은 
        테오 앞에 20년 만에 나타난 전 부인 줄리안은 그에게 기적적으로 임신한 소녀 키를 부탁한다.
      </div>
      <div className="content__information">
        <div className="content__information__title">
          감독
        </div>
        <div className="content__information__content">
          알폰소 쿠아론
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          출연
        </div>
        <div className="content__information__content">
          매튜 맥커너히, 앤 해서웨이, 제시카 차스테인
        </div>
      </div>
      <div className="content__information">
        <div className="content__information__title">
          개요
        </div>
        <div className="content__information__content">
          모험 · 드라마   |   미국 · 영국   |    2014년
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