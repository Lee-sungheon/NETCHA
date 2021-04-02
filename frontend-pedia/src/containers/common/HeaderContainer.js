import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/common/Header";

export default function HeaderContainer() {
  const {user} = useSelector(({user}) => ({user}.user));

  return (
    <Header user={user} />
  );
}
