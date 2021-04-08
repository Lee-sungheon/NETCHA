import './CommentModal.scss';

const CommentModal = ({
  visible,
  inputs,
  onCancel,
  onConfirm,
  onChange,
  myCommentData,
}) => {
  const {
    content,
    // , nickname
  } = inputs; // 비구조화 할당을 통해 값 추출
  if (!visible) return null;
  return (
    <div className="fullscreen">
      <div className="commentModalBlock">
        <div className="modalHeaderWrapper">
          <div className="modalHeaderBlock">
            <span className="span1" onClick={onCancel}>
              X
            </span>
            <span>{myCommentData.title}</span>
            <button
              type="submit"
              onClick={onConfirm}
              className={
                content && content.trim()
                  ? 'registerButton'
                  : 'unregisterButton'
              }
            >
              코멘트 작성
            </button>
          </div>
        </div>
        <div className="modalContent">
          <textarea
            className="inputForm"
            value={content}
            onChange={onChange}
            name="content"
            placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
