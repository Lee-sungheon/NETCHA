import './WriteComment.scss';
import { useState } from 'react';
import CommentModal from './CommentModal';
import * as commentApi from '../../../lib/api/comment';
const WriteComment = ({
  requestData,
  myCommentData,
  setMyCommentData,
  nickname,
}) => {
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    content: myCommentData.content || '',
    // nickname: '',
  });
  const onWriteClick = () => {
    setModal(true);
  };
  const onConfirm = async (e) => {
    if (inputs.content.trim()) setModal(false);
    try {
      await commentApi.insertComment({
        ...requestData,
        content: inputs.content,
      });
      setMyCommentData({ ...myCommentData, content: inputs.content });
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    onReset();
    setModal(false);
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      content: '',
    });
  };

  return (
    <>
      <div className="commentBlock">
        이 작품에 대한 {nickname} 님의 평가를 글로 남겨보세요.
        <button onClick={onWriteClick} className="commentButton">
          코멘트 남기기
        </button>
      </div>
      <CommentModal
        inputs={inputs}
        visible={modal}
        myCommentData={myCommentData}
        onChange={onChange}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onReset={onReset}
      />
    </>
  );
};

export default WriteComment;
