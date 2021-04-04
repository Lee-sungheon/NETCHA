import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import * as commentApi from '../../../lib/api/comment';
import './Comment.scss';

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

  const fetchComments = async () => {
    try {
      const response = await commentApi.readComments(requestData);
      setComments(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const insertLike = async (comment, index) => {
    try {
      await commentApi.insertCommentLike({
        userId: requestData.userId,
        reviewNo: comment.no,
      });
      comments[index].myLike = !comments[index].myLike;
    } catch (e) {}
  };

  const deleteLike = async (comment, index) => {
    try {
      await commentApi.deleteCommentLike({
        userId: requestData.userId,
        reviewNo: comment.no,
      });
      comments[index].myLike = !comments[index].myLike;
    } catch (e) {}
  };
  useEffect(() => {
    fetchComments();
  }, [comments]);

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
                  <span className="score">{comment.ranking}</span>
                </div>
              </div>

              <div className="content">{comment.content}</div>
              <div className="footer1">
                <ThumbUpAltIcon
                  style={{ fontSize: 15, color: 'grey', marginRight: '5px' }}
                />
                {comment.totalLike}
              </div>
              {!comment.mine && !comment.myLike && (
                <div
                  className="commentUnlike"
                  onClick={() => insertLike(comment, index)}
                >
                  좋아요
                </div>
              )}
              {!comment.mine && comment.myLike && (
                <div
                  className="commentLike"
                  onClick={() => deleteLike(comment, index)}
                >
                  좋아요
                </div>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
}
