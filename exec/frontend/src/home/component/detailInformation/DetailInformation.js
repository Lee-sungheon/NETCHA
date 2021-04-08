import { useEffect, useState } from 'react';
import './DetailInformation.scss'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { callApiMovieReview } from '../../../common/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { useSelector } from "react-redux";
import Comment from './Comment';

export default function DetailInformation({ movie }) {
  const [ index, SetIndex ] = useState(1);
  const [ reviews, setReviews ] = useState([]);
  const [ commentList1, setCommentList1 ] = useState([]);
  const [ commentList2, setCommentList2 ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const user = useSelector(state => state.user.userData.member);
  const history = useHistory();
  useEffect(()=> {
    async function fetchData() {
      await setIsLoading(true);
      const tmp_reviews = await callApiMovieReview(movie.no, user.seq);
      await setIsLoading(false);
      if (tmp_reviews) {
        setReviews(tmp_reviews);
      }
    }
    fetchData();
  }, [movie])
  useEffect(() => {
    const comments = reviews.slice((index-1)*4, index*4);
    setCommentList1(comments.slice(0, 2));
    setCommentList2(comments.slice(2, 4));
  }, [index, reviews])
  function indexLeft() {
    if (index > 1) {
      SetIndex(index-1)
    }
  }
  function indexRight() {
    if (index <= reviews.length/4) {
      SetIndex(index+1)
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

  return (
    <>
      <div style={{width: '20%'}}>
        <div className="detail__title">감독</div>
        <p className="detail__people"><span className="detail__people__member" onClick={onDirectorSearch}>{ movie.directors[0] }</span></p>
        <div className="detail__title" style={{ marginTop: '1.5vw'}}>배우</div>
        { movie.casts.slice(0, 10).map((member) => (
          <p className="detail__people" key={member}><span className="detail__people__member" onClick={onCastSearch}>{member.split('(')[0]}</span></p>
        ))}
      </div>
      <div style={{width: '80%', display: 'flex'} }>
        <div className="detail__chevron-box" 
          onClick={indexLeft}
          style={index > 1 ? {visibility: 'visible'}:{visibility: 'hidden'}}
        >
          <ChevronLeftIcon className="detail__chevron"/>
        </div>
        <div style={{width: '90%'}}>
          <div style={{display: 'flex', alignItems: 'center', marginLeft: '2.5vw'}}>
            <div className="detail__title" style={{ marginRight: '0.5vw' }}>평균 별점</div>
            <Rating 
              name="custom-empty"
              precision={0.2} 
              value={movie.avgRank}
              style={{color: 'white'}}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: 'gray'}} />}
            />
            <div className="detail__title" style={{ marginLeft: '0.5vw' }}>{movie.avgRank}</div>
            <div className="detail__people" style={{ marginLeft: '1vw', lineHeight: '2vw'}}>{reviews.length}명</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            { isLoading &&
            <div style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <CircularProgress color="secondary" />
            </div>}
            { !isLoading &&<> { reviews.length === 0 && 
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', color: 'white'}}
            ><SpeakerNotesOffIcon style={{marginRight: '0.5vw'}}/>댓글이 없습니다!</div>}
            <div style={{display: 'flex', margin: '0.625vw 1vw 0px'}}>
              {commentList1.map((comment, index) => (
                <div style={{display: 'flex', flex: '1 1 0%',  flexDirection: 'column', margin: '0px 1.64062vw 0.625vw'}} key={index}>
                  <Comment comment={comment} movie={movie} />
                </div>
              ))}
            </div>
            <div style={{display: 'flex', margin: '0.625vw 1vw 0px'}}>
              {commentList2.map((comment, index) => (
                <div style={{display: 'flex', flex: '1 1 0%',  flexDirection: 'column', margin: '0px 1.64062vw 0.625vw'}} key={index}>
                  <Comment comment={comment} movie={movie} />
                </div>
              ))}
            </div>
            </>}
          </div>
        </div>
        <div className="detail__chevron-box" 
          onClick={indexRight}
          style={index < reviews.length/4 ? {visibility: 'visible'}:{visibility: 'hidden'}}
        >
          <ChevronRightIcon className="detail__chevron" />
        </div>
      </div>
      
    </>
  )
}