import React from "react";
import Footer from "../components/common/Footer";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserContainer from "../containers/user/UserContainer";

const User = () => {
  return (
    <>
      <HeaderContainer />
      <UserContainer />
      <Footer />
    </>
  );
}

export default User;