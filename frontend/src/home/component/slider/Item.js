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
          >
            <Card style={isActive === true ? {border: 'solid 2px white'}:{}} >
              <CardActionArea>
                <div className='image-box'>
                  <CardMedia
                    component="img"
                    image={ movie.imageUrl !== 'default' ? movie.imageUrl : "/images/netchar2.png" }
                    className='image-style'
                    id={idx}
                  />
                </div>
                <CardContent className="show-card-content" id={idx}>
                    <div style={{width:'100%', position: 'relative'}} id={idx}>
                      <PlayArrowIcon className='play-button'id={idx} />
                      <AddIcon className='common-button'id={idx} />
                      <ThumbUpAltIcon className='common-button' id={idx} />
                      <ThumbDownIcon className='common-button'id={idx} />
                      <ExpandMoreIcon className='end-button' id={idx} onClick={() => onSelectSlide(movie)}/>
                    </div>
                  <h5 style={{textAlign: 'center', margin:'5px', textAlign: 'start'}} id={idx}>{movie.title.slice(0, 18)}</h5>
                  <div style={{display: 'flex', alignItems: 'center'}} id={idx}>
                    { movie.rating !== undefined &&  <img style={{width: '12%', margin: '0 5px'}} src={`/images/${movie.rating.slice(0,2)}.svg`} />}
                    <span style={{fontSize: '0.65rem', fontWeight: 900}}>{parseInt(movie.time/60)}시간 {movie.time%60}분</span>
                  </div>
                  <h6 style={{textAlign: 'center', margin:'5px', textAlign: 'start'}} id={idx}>
                    {movie.keywords !== undefined && movie.keywords.slice(0,3).map((keyword, idx) => (
                      <span key={keyword}>{idx !== 0 && <span> • </span>}{keyword}</span>
                    ))}
                  </h6>
                </CardContent>
              </CardActionArea>
            </Card>
            {<div className="show-card-title" style={isActive ? {opacity: 1}:{opacity: 0.7}}>
              {movie.title.slice(0, 14)}
              {movie.title.length > 14 && '...'}
            </div>}
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
};