import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { setUser, logout } from '../../modules/user';

export default function HeaderContainer() {
  const { user } = useSelector(({ user }) => ({ user }.user));
  const dispatch = useDispatch();
  const onLogout = () => {
    console.log('로그아웃들어옴');
    dispatch(logout());
  };
  const onLogin = () => {
    console.log('로그인들어옴');
    const newUser = { seq: 1, nickname: '내가바로이름' };
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
  };

  return <Header user={user} onLogout={onLogout} onLogin={onLogin} />;
}
