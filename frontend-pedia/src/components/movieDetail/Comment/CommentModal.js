import './CommentModal.scss';

const CommentModal = ({ visible, onCancel, onConfirm }) => {
  const isWrite = false;
  if (!visible) return null;
  return (
    <div className="fullscreen">
      <div className="commentModalBlock">
        <div className="modalHeaderWrapper">
          <div className="modalHeaderBlock">
            <span className="span1" onClick={onCancel}>
              X
            </span>
            <span>영화제목영화제목영화제목</span>
            <button
              type="submit"
              onClick={onConfirm}
              className={isWrite ? 'registerButton' : 'registerButton'}
            >
              코멘트 작성
            </button>
          </div>
        </div>
        <div className="modalContent">
          <textarea
            className="inputForm"
            placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
