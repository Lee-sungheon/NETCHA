import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import './Item.scss'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function Item({ movie, idx }) {
  return (
    <SliderContext.Consumer>
      {function Itemsetup({ onSelectSlide, currentSlide, elementRef }) {
        const isActive = currentSlide && currentSlide.no === movie.no;
        return (
          <div
            ref={elementRef}
            className={cx('item', {
              'item--open': isActive,
            })}
            id={idx}
          >
            <Card style={isActive === true ? {border: 'solid 2px white'}:{}} >
              <CardActionArea style={{zIndex: 5}}>
                <div className='image-box'>
                  <CardMedia
                    component="img"
                    image={ movie.imageUrl[0] !== 'default' ? movie.imageUrl[0] : "/images/netchar2.png" }
                    className='image-style'
                    id={idx}
                  />
                </div>
              </CardActionArea>
              <CardContent className="show-card-content" id={idx} style={{paddingBottom: '10px'}}>
                  <div style={{width:'100%', position: 'relative'}} id={idx}>
                    <PlayArrowIcon className='play-button' id={idx}/>
                    <AddIcon className='common-button' id={idx}/>
                    <ThumbUpAltIcon className='common-button' id={idx}/>
                    <ThumbDownIcon className='common-button' id={idx}/>
                    <ExpandMoreIcon className='end-button' onClick={() => onSelectSlide(movie)} id={idx}/>
                  </div>
                <h5 style={{textAlign: 'center', margin:'5px', textAlign: 'start'}} id={idx}>{movie.title}</h5>
                <div style={{display: 'flex', alignItems: 'center'}} id={idx}>
                  {movie.rating !== "" && movie.rating !== undefined && <img style={{width: '12%', margin: '0 5px'}} src={`/images/${RATING[movie.rating.slice(0,2)]}.svg`} id={idx}/>}
                  <div style={{fontSize: '0.65rem', fontWeight: 900}} id={idx}>{parseInt(movie.time/60)}시간 {movie.time%60}분</div>
                </div>
                <h6 style={{textAlign: 'center', margin:'5px', textAlign: 'start'}} id={idx}>
                  {movie.keywords !== undefined && movie.keywords.slice(0,3).map((keyword, idx) => (
                    <span key={keyword} id={idx}>{idx !== 0 && <span id={idx}> • </span>}{keyword}</span>
                  ))}
                </h6>
              </CardContent>
            </Card>
            {<div className="show-card-title" id={idx} style={isActive ? {opacity: 1}:{opacity: 0.7}}>
              {movie.title.slice(0, 14)}
              {movie.title.length > 14 && '...'}
            </div>}
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
};

const RATING = {
  '15' : '15',
  '12' : '12',
  '18' : '18',
  전체 : 'all',
  고등 : '15',
  미성 : '18',
  연소 : '18',
  중학 : '12',
  청소 : '18',
}