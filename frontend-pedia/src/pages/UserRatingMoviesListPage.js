import React from "react";
import Footer from "../components/common/Footer";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserRatingMoviesListContainer from "../containers/user/UserRatingMoviesListContainer";

const UserRatingMoviesListPage = () => {
  return (
    <>
      <HeaderContainer />
      <UserRatingMoviesListContainer />
      <Footer />
    </>
  );
}

export default UserRatingMoviesListPage;