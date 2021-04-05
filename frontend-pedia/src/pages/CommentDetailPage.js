import React from "react";
import Footer from "../components/common/Footer";
import HeaderContainer from "../containers/common/HeaderContainer";
import CommentDetailContainer from "../containers/comment/CommentDetailContainer";
const MovieDetailPage = () => {
  return (
    <>
      <HeaderContainer />
      <div className="container3">
        <div className="container2">
          <CommentDetailContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetailPage;
