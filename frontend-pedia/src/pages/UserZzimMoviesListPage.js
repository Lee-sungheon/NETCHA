import React from "react";
import Footer from "../components/common/Footer";
import HeaderContainer from "../containers/common/HeaderContainer";
import UseZzimMoviesListContainer from "../containers/user/UseZzimMoviesListContainer";

const UserZzimMoviesListPage = () => {
  return (
    <>
      <HeaderContainer />
      <UseZzimMoviesListContainer />
      <Footer />
    </>
  );
}

export default UserZzimMoviesListPage;