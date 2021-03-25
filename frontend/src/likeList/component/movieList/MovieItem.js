import React from 'react';
import cx from 'classnames';
import MovieListContext from './context'
import './MovieItem.scss'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const MovieItem = ({ movie, idx }) => (
  <MovieListContext.Consumer>
    {function Itemsetup({ onSelectSlide, currentSlide, elementRef }) {
      const isActive = currentSlide && currentSlide.id === movie.id;
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <Card style={isActive === true ? {border: 'solid 2px white'}:{}} >
            <CardActionArea>
              <CardMedia
                component="img"
                image={movie.image}
                className='image-style'
                id={idx}
              />
              <CardContent className="show-card-content" id={idx}>
                  <div style={{width:'100%', position: 'relative'}} id={idx}>
                    <PlayArrowIcon className='play-button'id={idx} />
                    <AddIcon className='common-button'id={idx} />
                    <ThumbUpAltIcon className='common-button' id={idx} />
                    <ThumbDownIcon className='common-button'id={idx} />
                    <ExpandMoreIcon className='end-button' id={idx} onClick={() => onSelectSlide(movie)}/>
                  </div>
                <h5 style={{textAlign: 'center', margin:'5px'}} id={idx}>{movie.title}</h5>
                <h6 style={{textAlign: 'center', margin:'5px'}} id={idx}>로맨스 / 코미디 / 액션</h6>
              </CardContent>
            </CardActionArea>
          </Card>
          {<div className="show-card-title" style={isActive ? {opacity: 1}:{opacity: 0.7}}>{movie.title}</div>}
        </div>
      );
    }}
  </MovieListContext.Consumer>
);

export default MovieItem;
