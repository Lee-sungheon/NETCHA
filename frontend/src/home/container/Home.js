import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '../component/slider'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'visible',
  },
}));


export default function Home() {
  const classes = useStyles();
  return (
    <>
      <div style={{width: '100%', height: '500px', color: 'white', textAlign: 'center', lineHeight: '500px'}}>배너 자리</div>
      <div className={classes.root}>
        <div className={classes.root} id={'slider-1'}>
          <Slider title={'Netcha 인기 콘텐츠'} idx={`slider-1`}>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
        <div className={classes.root} id={'slider-2'}>
          <Slider title={'Netcha 랜덤 콘텐츠'} idx={`slider-2`}>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
        <div className={classes.root} id={`slider-3`}>
          <Slider title={'Netcha 싸피 콘텐츠'} idx={`slider-3`}>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
        <div className={classes.root} id={`slider-4`}>
          <Slider title={'Netcha 추천 콘텐츠'} idx={`slider-4`}>
            {movies.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
      <div style={{width: '100%', height: '300px', color: 'white', textAlign: 'center', lineHeight: '300px'}}>풋터 자리</div>
    </>
  );
}

const movies = [
  {
    id: 1,
    image: '/images/slide1.jpg',
    imageBg: '/images/slide1b.webp',
    title: '1983'
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    imageBg: '/images/slide2b.webp',
    title: 'Russian doll'
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    imageBg: '/images/slide3b.webp',
    title: 'The rain',
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    imageBg: '/images/slide4b.webp',
    title: 'Sex education'
  },
  {
    id: 5,
    image: '/images/slide5.jpg',
    imageBg: '/images/slide5b.webp',
    title: 'Elite'
  },
  {
    id: 6,
    image: '/images/slide6.jpg',
    imageBg: '/images/slide6b.webp',
    title: 'Black mirror'
  },
  {
    id: 7,
    image: '/images/slide1.jpg',
    imageBg: '/images/slide1b.webp',
    title: '1983'
  },
  {
    id: 8,
    image: '/images/slide2.jpg',
    imageBg: '/images/slide2b.webp',
    title: 'Russian doll'
  },
  {
    id: 9,
    image: '/images/slide3.jpg',
    imageBg: '/images/slide3b.webp',
    title: 'The rain',
  },
  {
    id: 10,
    image: '/images/slide4.jpg',
    imageBg: '/images/slide4b.webp',
    title: 'Sex education'
  },
  {
    id: 11,
    image: '/images/slide5.jpg',
    imageBg: '/images/slide5b.webp',
    title: 'Elite'
  },
  {
    id: 12,
    image: '/images/slide6.jpg',
    imageBg: '/images/slide6b.webp',
    title: 'Black mirror'
  }
];