import './SimilarMovie.scss'
import { useEffect, useState } from 'react';
import cx from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { actions } from "../../state";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SimilarMovie({ movie }) {
  const [ index, SetIndex ] = useState(1);
  const [ similarList, setSimilarList ] = useState([]);
  const similarMovie = useSelector(state => state.home.similarMovieLists);
  const isLoading = useSelector(state => state.home.isSimilarLoading);
  const user = useSelector((state) => state.user.userData.member);
  const history = useHistory();
  const dispatch = useDispatch();
  function indexLeft() {
    if (index > 1) {
      SetIndex(index-1)
    }
  }
  function indexRight() {
    if (index <= similarMovie.length/4) {
      SetIndex(index+1)
    }
  }
  useEffect(() => {
    dispatch(actions.requestSimilarMovieList(movie.no, user.seq));
  }, [dispatch, movie, user])
  useEffect(() => {
    if (similarMovie.length > 3) {
      const movies = similarMovie.slice((index-1)*4, index*4);
      setSimilarList(movies);
    }
  }, [index, similarMovie])

  return (
    <>
      <div className="similar__container" >
        {isLoading &&
          <div style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress color="secondary" />
          </div>
        }
        {!isLoading &&
        <div className="similar__area" >
          <div className="similar__chevron-box-left" 
            onClick={indexLeft}
            style={index > 1 ? {visibility: 'visible'}:{visibility: 'hidden'}}
          >
            <ChevronLeftIcon className="similar__chevron" />
          </div>
          <div className="similar__chevron-box-right" 
            onClick={indexRight}
            style={index < similarMovie.length/4 ? {visibility: 'visible'}:{visibility: 'hidden'}}
          >
            <ChevronRightIcon className="similar__chevron" />
          </div>
          <ul style={{padding: '0', margin: '0'}}>
            {similarList.map((movie, idx) => (
              <li 
                key={idx}
                className={cx('similar__list', { 'similar__index': idx !== 0})} 
              >
                <div className="similar__img-box">
                  <div className="similar__background" style={{backgroundImage: `url(${ movie.imageUrl[0] !== 'default' ? movie.imageUrl[0] : "/images/netchar2.png" })`}} />
                  <div className="similar__play-box" onClick={function(){history.push(`/movie/movie-${movie.no}`)}} >
                    ▶
                  </div>
                </div>
                <div className="similar__text-box">
                  <div className="similar__title">{movie.title}</div>
                  <div className="similar__info">
                    {movie.rating !== "" && movie.rating !== undefined && 
                    <img style={{width: '7%', margin: '0 3px'}} src={`/images/${RATING[movie.rating.slice(0,2)]}.svg`} id={idx} alt=""/>}
                     • {parseInt(movie.time/60)}시간 {movie.time%60}분
                  </div>
                  <div className="similar__description">
                    {movie.scenario.slice(0,118)}
                    {movie.scenario.length > 120 && <span>...</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </>
  )
}

const RATING = {
  '15' : '15',
  '12' : '12',
  '18' : '18',
  전체 : 'all',
  모두 : 'all',
  고등 : '15',
  미성 : '18',
  연소 : '18',
  중학 : '12',
  청소 : '18',
}