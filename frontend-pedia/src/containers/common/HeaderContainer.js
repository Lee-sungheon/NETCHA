import React from "react";
import Header from "../../components/common/Header";

export default function HeaderContainer() {
  const userId = 1;

  return (
    <Header userId={userId} />
  );
}
