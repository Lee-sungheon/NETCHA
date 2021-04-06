import React from "react";

import { useSelector } from "react-redux";
import "./Footer.scss";

export default function Footer() {
  const isHeader_ = useSelector((state) => state.search.isHeader);

  return (
    <>
      {isHeader_ && (
        <div className="footerContainer">
          <ul>
            <li className="footerText">서비스 이용약관 &nbsp;&nbsp;&#124;</li>
            <li className="footerText">개인정보 처리방침 &nbsp;&nbsp;&#124;</li>
            <li className="footerText">회사 안내</li>
          </ul>
          <ul>
            <br></br>
            <li className="footerText">
              <strong>구미 5팀 &nbsp; </strong>&#124;
            </li>
            <li className="footerText">강민창 &nbsp;&nbsp;&#124; </li>
            <li className="footerText">강유정 &nbsp;&nbsp;&#124; </li>
            <li className="footerText">손동민 &nbsp;&nbsp;&#124; </li>
            <li className="footerText">이성헌 &nbsp;&nbsp;&#124; </li>
            <li className="footerText">이지원</li>
          </ul>
          <ul>
            <br></br>
            <li className="footerText">
              © 2021 by <strong>NETCHA</strong>, Inc. All rights reserved.
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
