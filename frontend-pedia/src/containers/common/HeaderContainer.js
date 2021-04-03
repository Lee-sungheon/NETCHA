import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/Header";
import  { setUser, logout } from "../../modules/user";

export default function HeaderContainer() {
  const {user} = useSelector(({user}) => ({user}.user));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  }
  const onLogin = () => {
    const newUser = {userId: '내가바로아이디', userName: '내가바로이름'};
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch(setUser(newUser));
  }

  return (
    <Header user={user} onLogout={onLogout} onLogin={onLogin} />
  );
}
