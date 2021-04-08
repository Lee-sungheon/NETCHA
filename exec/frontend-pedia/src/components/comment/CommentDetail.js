import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as commentApi from '../../lib/api/comment';
import './CommentDetail.scss';
// 폴더명
const CommentDetail = ({ requestData, history }) => {
  const [comment, setComment] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await commentApi.readComment({
        userId: requestData.userId,
        reviewNo: requestData.commentNo,
      });
      setComment(response.data);
    } catch (e) {
      console.log(e);
    }
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
  return (
    <>
      {comment && (
        <>
          <div
            className="commentDiv1"
            onClick={() => {
              history.push('/movieDetail/' + comment.movieId);
            }}
          >
            ←
          </div>
          <div className="commentDiv2">코멘트</div>
          <div className="commentDetailWrapper">
            <div className="commentBox">
              <div className="header">
                {comment.userNickname}
                {comment.ranking !== 0 && (
                  <div>
                    <span>★</span>
                    <span className="score">{comment.ranking.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="commentContent">{comment.content}</div>
              <div className="footer1">
                <ThumbUpAltIcon
                  style={{ fontSize: 15, color: 'grey', marginRight: '5px' }}
                />
                {comment.totalLike}
              </div>
              {!comment.myLike && (
                <div
                  className="commentUnlike"
                  onClick={() => insertLike(comment)}
                >
                  좋아요
                </div>
              )}
              {comment.myLike && (
                <div
                  className="commentLike"
                  onClick={() => deleteLike(comment)}
                >
                  좋아요
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(CommentDetail);
