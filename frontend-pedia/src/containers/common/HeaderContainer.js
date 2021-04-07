import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { setUser } from '../../modules/user';

export default function HeaderContainer() {
  const { user } = useSelector(({ user }) => ({ user }.user));
  const dispatch = useDispatch();
  const onLogin = () => {
    const newUser = { seq: 11, nickname: 'guest' };
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
  };

  return <Header user={user} onLogin={onLogin} />;
}
