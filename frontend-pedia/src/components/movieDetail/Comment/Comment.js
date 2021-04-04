import Slider from 'react-slick';
import './Comment.scss';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useCallback, useEffect, useState } from 'react';
import * as commentApi from '../../../lib/api/comment';

export default function Comment({ requestData }) {
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
  const [comments, setComments] = useState(null);

  const fetchComments = async (e) => {
    try {
      const response = await commentApi.readComments(requestData);
      console.log(response.data);
      setComments(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (requestData.movieNo && requestData.userId) fetchComments();
  }, [requestData]);
  return (
    <div className="comment">
      <div className="infoHeader">코멘트</div>
      <Slider {...settings}>
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="commentBox">
              <div className="header">
                {comment.userNickname}
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
                {comment.totalLike}
              </div>
              <div className="footer2">좋아요</div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
