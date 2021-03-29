import Slider from 'react-slick';
import './Comment.scss';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
export default function Comment() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 1,
    arrows: true,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
  };
  return (
    <div className="comment">
      <div className="infoHeader">
        코멘트<span>더보기</span>
      </div>
      <Slider {...settings}>
        {comments.map((comment) => (
          <div key={comment.name} className="commentBox">
            <div className="header">
              {comment.name}
              <div>
                <span>★</span>
                <span className="score">5.0</span>
              </div>
            </div>

            <div className="content">{comment.content}</div>
            <div className="footer1">
              <ThumbUpAltIcon
                style={{ fontSize: 15, color: 'grey', marginRight: '5px' }}
              />
              {comment.likes}
            </div>
            <div className="footer2">좋아요</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const comments = [
  {
    name: '서영욱',
    score: 4.0,
    content: 'ㄴㅇㄹ하ㅓ하ㅣㅇㄹ허sdfsdfsdfㅣㅏㅇ러히ㅏ',
    likes: 1139,
  },
  {
    name: 'chan',
    score: 3.5,
    content: '재밌어요',
    likes: 5,
  },
  {
    name: 'good',
    score: 5.0,
    content: '미나리 맛있어요',
    likes: 22,
  },
  {
    name: 'chan',
    score: 3.5,
    content: '재밌어요',
    likes: 5,
  },
  {
    name: 'good',
    score: 5.0,
    content: '미나리 맛있어요',
    likes: 22,
  },
  {
    name: 'chan',
    score: 3.5,
    content: '재밌어요',
    likes: 5,
  },
  {
    name: 'good',
    score: 5.0,
    content: '미나리 맛있어요',
    likes: 22,
  },
];
