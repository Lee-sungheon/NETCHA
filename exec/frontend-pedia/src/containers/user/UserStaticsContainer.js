import React from 'react';
import UserStatics from '../../components/user/UserStatics';
import { useSelector } from 'react-redux';

const UserStaticsContainer = () => {
  const { user } = useSelector(({ user }) => ({ user }.user));

  return <UserStatics user={user} />;
};

export default UserStaticsContainer;
