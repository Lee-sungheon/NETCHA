import React from 'react';
import { useSelector } from 'react-redux';
import User from '../../components/user/User';

const UserContainer = () => {
  const { user } = useSelector(({ user }) => ({ user }.user));
  return <User user={user} />;
};

export default UserContainer;
