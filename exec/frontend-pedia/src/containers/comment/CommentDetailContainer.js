import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentDetail from '../../components/comment/CommentDetail';

const CommentDetailContainer = ({ commentNo }) => {
  // 처음 마운트될 때 무비 읽기 API 요청
  const { requestData } = useSelector(({ user }) => ({
    user: user.user,
    requestData: {
      commentNo: commentNo,
      userId: user.user.userId,
    },
  }));
  return (
    <>
      <div className="commentDetailWrapper">
        <CommentDetail requestData={requestData} />
      </div>
    </>
  );
};

export default CommentDetailContainer;
