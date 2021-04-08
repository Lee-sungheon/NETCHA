import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import * as commentApi from '../../../lib/api/comment';
import './Comment.scss';

const Comment = ({ requestData, history }) => {
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
  const [comments, setComments] = useState('');

  const fetchComments = async () => {
    setTimeout(async () => {
      try {
        const response = await commentApi.readComments(requestData);
        setComments(response.data);
      } catch (e) {
        console.log(e);
      }
    }, 300);
  };

  const insertLike = async (comment) => {
    try {
      await commentApi.insertCommentLike({
        userId: requestData.userId,
        reviewNo: comment.no,
      });
      fetchComments();
    } catch (e) {}
  };

  const deleteLike = async (comment) => {
    try {
      await commentApi.deleteCommentLike({
        userId: requestData.userId,
        reviewNo: comment.no,
      });
      fetchComments();
    } catch (e) {}
  };
  useEffect(() => {
    fetchComments();
  }, [requestData]);

  if (comments.length === 0)
    return (
      <div className="comment">
        <div className="infoHeader">코멘트</div>
        <div>아직 평가된 코멘트가 없습니다.</div>
      </div>
    );
  return (
    <div className="comment">
      <div className="infoHeader">코멘트</div>
      <Slider {...settings}>
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="commentBox">
              <div className="header">
                <div
                  className="profileBox"
                  onClick={() => {
                    history.push('/user/statics/' + comment.userId);
                  }}
                  style={{
                    display: 'flex',
                    background: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="/images/profileIcon.jpg"
                    className="profileIconImg"
                    alt="profile"
                    style={{
                      display: 'inline-block',
                      width: '30px',
                      borderRadius: '60%',
                      position: 'relative',
                      top: '-3px',
                      border: '1px solid #e6e6e6',
                    }}
                  />
                  <span
                    style={{
                      marginLeft: '5px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    {comment.userNickname}
                  </span>
                </div>
                {comment.ranking !== 0 && (
                  <div style={{ width: '50px' }}>
                    <span>★</span>
                    <span className="score">{comment.ranking.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div
                className="content"
                onClick={() => history.push('/commentDetail/' + comment.no)}
              >
                {comment.content}
              </div>
              <div className="footer1">
                <ThumbUpAltIcon
                  style={{ fontSize: 15, color: 'grey', marginRight: '5px' }}
                />
                {comment.totalLike}
              </div>
              {!comment.myLike && (
                <div
                  className="commentUnlike"
                  onClick={() => insertLike(comment, index)}
                >
                  좋아요
                </div>
              )}
              {comment.myLike && (
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
};

export default withRouter(Comment);
