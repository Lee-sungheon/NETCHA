import './WriteComment.scss';
import { useState } from 'react';
import CommentModal from './CommentModal';
const WriteComment = () => {
  const [modal, setModal] = useState(false);
  const onWriteClick = () => {
    setModal(true);
  };
  const onConfirm = () => {
    setModal(false);
  };
  const onCancel = () => {
    setModal(false);
  };

  return (
    <>
      <div className="commentBlock">
        이 작품에 대한 강민창 님의 평가를 글로 남겨보세요.
        <button onClick={onWriteClick} className="commentButton">
          코멘트 남기기
        </button>
      </div>
      <CommentModal visible={modal} onCancel={onCancel} onConfirm={onConfirm} />
    </>
  );
};

export default WriteComment;

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
