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


const Item = ({ movie }) => (
  <SliderContext.Consumer>
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
              />
              <CardContent
                className="show-card-content">
                  <div style={{width:'100%', position: 'relative'}}>
                    <PlayArrowIcon className='play-button'/>
                    <AddIcon className='common-button'/>
                    <ThumbUpAltIcon className='common-button'/>
                    <ThumbDownIcon className='common-button'/>
                    <ExpandMoreIcon className='end-button' onClick={() => onSelectSlide(movie)}/>
                  </div>
                <h5 style={{textAlign: 'center', margin:'5px'}}>{movie.title}</h5>
                <h6 style={{textAlign: 'center', margin:'5px'}}>로맨스 / 코미디 / 액션</h6>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
