import { useEffect, useState } from 'react';
import './BasicInformation.scss'
import AddIcon from '@material-ui/icons/Add';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { callApiRequestZzim, callApiDeleteZzim, callApiLike } from '../../../common/api';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../navbar/state";
import { likeactions } from "../../../likeList/state";


export default function Buttons({ movie }) {
  const [ isLike, setIsLike ] = useState(movie.userDidLike);
  const [ isZzim, setIsZzim ] = useState(movie.userDidZzim);
  const user = useSelector(state => state.user.userData.member);
  const zzimList = useSelector(state => state.search.isZzim);
  const likeList = useSelector(state => state.search.isLike);
  const dispatch = useDispatch();
  useEffect(()=>{
    if (zzimList.length > 0) {
      for (let zzim of zzimList){
        if (zzim[0] === movie.no) {
          setIsZzim(zzim[1])
        }
      }
    }
    if (likeList.length > 0) {
      for (let like of likeList){
        if (like[0] === movie.no) {
          setIsLike(like[1])
        }
      }
    }
  }, [likeList, movie, zzimList])
  function toggleZzim() {
    if(!isZzim) {
      callApiRequestZzim(user.seq, movie.no);
      setIsZzim(!isZzim);
      dispatch(actions.setIsZzim(movie.no, true));
    } 
    else {
      callApiDeleteZzim(user.seq, movie.no);
      dispatch(actions.setIsZzim(movie.no, false));
      dispatch(likeactions.deleteLike(movie.no));
      setIsZzim(!isZzim);
    }
  }
  function toggleLike() {
    if (isLike !== 1){
      callApiLike(user.seq, movie.no, 1);
      dispatch(actions.setIsLike(movie.no, 1));
      setIsLike(1);
    } else {
      callApiLike(user.seq, movie.no, 1);
      dispatch(actions.setIsLike(movie.no, 0));
      setIsLike(0);
    }
  }
  function toggleDislike() {
    if (isLike !== -1){
      callApiLike(user.seq, movie.no, -1);
      dispatch(actions.setIsLike(movie.no, -1));
      setIsLike(-1);
    } else {
      callApiLike(user.seq, movie.no, -1);
      dispatch(actions.setIsLike(movie.no, 0));
      setIsLike(0);
    }
  }

  return (
    <>
      {!isZzim ? <AddIcon 
        className='content__common-button'
        onClick={toggleZzim}
      />:
      <CheckIcon
        className='content__common-button'
        onClick={toggleZzim}
      />}
      { isLike !== 1 ? <ThumbUpAltOutlinedIcon 
        className='content__common-button' 
        onClick={toggleLike}
        />: 
      <ThumbUpAltIcon 
        className='content__common-button' 
        onClick={toggleLike}
      />}
      { isLike !== -1 ? <ThumbDownOutlinedIcon 
        className='content__common-button' 
        onClick={toggleDislike}
        />:
      <ThumbDownIcon 
        className='content__common-button' 
        onClick={toggleDislike}
      />}
    </>
  )
};