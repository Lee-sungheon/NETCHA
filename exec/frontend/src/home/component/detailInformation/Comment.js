import { useState } from 'react';
import './DetailInformation.scss'
import { useSelector } from "react-redux";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { callApiReviewLike, callApiReviewDisLike } from '../../../common/api';
import { useEffect } from 'react';


export default function Comment({ comment, movie }) {
  const token = useSelector(state => state.user.userData.token);
  const user = useSelector(state => state.user.userData.member);
  const [ isLike, setIsLike ] = useState(false);
  useEffect(()=>{
    setIsLike(comment.myLike);
  }, [comment])
  async function toggleReviewLike() {
    if(isLike){
      if (await callApiReviewDisLike(user.seq, comment.no) === 'success'){
        setIsLike(!isLike);
      }
    } else {
      if (await callApiReviewLike(user.seq, comment.no) === 'success'){
        setIsLike(!isLike);
      }
    }
  }
  return (
    <>
      <div className="detail__people">{comment.userNickname}</div>
      <div className="detail__comment" >
        {comment.content.slice(0,60)}
        {comment.content.length > 60 && <span>...</span>}
        {comment.content.length > 60 && <span className="detail__more" >
          <a style={{color: 'white'}} href={`https://netcha-pedia.netlify.app/movieDetail/${movie.no}/${token}`} target="blank">더보기</a></span>}
      </div>
      <div className="detail__thumb" >
        {!isLike ? 
          <><ThumbUpAltOutlinedIcon style={{height: '1.3vw', cursor: 'pointer'}} onClick={toggleReviewLike}/>
          <span style={{marginLeft: '0.4vw'}}>{comment.totalLike}</span></>
        : <><ThumbUpAltIcon style={{height: '1.3vw', cursor: 'pointer'}} onClick={toggleReviewLike} />
          <span style={{marginLeft: '0.4vw'}}>{comment.totalLike+1}</span></>
        }
      </div>
    </>
  )
}