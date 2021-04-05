import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";

export default function UserStatics() {
  return (
    <>
          <HeaderContainer />
          <div style={{paddingTop: 100, paddingBottom: 100, fontSize: 80, fontWeight: 700, textAlign: "center"}}>
              유저가 평가한 영화 페이지!
          </div>
      <Footer />
    </>
  );
}
