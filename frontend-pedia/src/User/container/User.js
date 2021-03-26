import React from 'react';
import './User.scss';
import { useHistory } from 'react-router-dom';

export default function User() {
  const userId = 1;
  function goToStatics() {
    history.push(`/user/statics/${userId}`);
  }

  const history = useHistory();
  return (
    <div className="userWrapper">
      <div className="userBox">
        <div className="wallPaper"></div>
        <div className="user">
          <div className="profile">
            <img src="/images/profile.png" style={{ width: '70px' }} />
            <div style={{ marginTop: '-20px' }}>
              <h2>강유정</h2>
            </div>
          </div>
          <hr />
          <a href="#" onClick={goToStatics}>
            <div>
              <img src="/images/graph.png" width="40px" alt="취향분석" style={{marginBottom: "-9px"}}/>
              <h3 style={{ display: 'inline-block' }}>&nbsp;취향분석</h3>
            </div>
          </a>
          <hr />
        </div>
      </div>
    </div>
  );
}

