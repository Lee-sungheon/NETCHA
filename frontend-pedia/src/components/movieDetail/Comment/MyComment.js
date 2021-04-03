import './MyComment.scss';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import { useState } from 'react';
import CommentModal from './CommentModal';
import * as commentApi from '../../../lib/api/comment';

const MyComment = ({ commentData, setCommentData }) => {
  const [modal, setModal] = useState(false);
  const onWriteClick = () => {
    setModal(true);
  };
  const onDeleteClick = async (e) => {
    try {
      commentApi.deleteComment(commentData);
    } catch (e) {
      console.log(e);
    }
    setCommentData({ ...commentData, content: '' });
  };

  const onConfirm = async (e) => {
    if (inputs.content.trim()) setModal(false);
    try {
      await commentApi.insertComment({
        ...commentData,
        content: inputs.content,
      });
    } catch (e) {
      console.log(e);
    }
    setCommentData({ ...commentData, content: inputs.content });
  };

  const onCancel = () => {
    onReset();
    setModal(false);
  };

  const [inputs, setInputs] = useState({
    content: commentData.content,
    // nickname: '',
  });

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
      // nickname: '',
    });
  };

  return (
    <div className="myCommentBlock">
      <img
        src="/images/profileIcon.jpg"
        className="profileIconImg"
        style={{
          width: '40px',
          borderRadius: '60%',
          border: '1px solid #e6e6e6',
        }}
      />
      <div className="content">{commentData.content}</div>
      <div className="modify">
        <button onClick={() => onDeleteClick()}>
          <DeleteForeverOutlinedIcon className="delete" /> 삭제
        </button>
        <button onClick={() => onWriteClick()}>
          <CreateTwoToneIcon className="update" /> 수정
        </button>
      </div>
      <CommentModal
        inputs={inputs}
        visible={modal}
        onChange={onChange}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onReset={onReset}
      />
    </div>
  );
};

export default MyComment;
