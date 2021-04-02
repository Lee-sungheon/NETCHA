import React from "react";
import UserStaticsContainer from "../containers/user/UserStaticsContainer";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";

export default function UserStatics() {
  return (
    <>
      <HeaderContainer />
      <UserStaticsContainer />
      <Footer />
    </>
  );
}
