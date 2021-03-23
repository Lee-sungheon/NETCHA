import React, { useState, useEffect } from "react";

import Icon from "@material-ui/core/Icon";
import img1 from "../../img/icon1.png";
import img2 from "../../img/icon2.png";
import img3 from "../../img/icon3.png";
export default function ProfileList(props) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "900px",
          marginTop: "200px",
        }}
      >
        <div
          style={{
            width: "850px",
            height: "340px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "3rem",
            }}
          >
            Netcha를 시청할 프로필을 선택하세요.
          </div>
          <div
            style={{
              margin: "auto",
              height: "300px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <ul
              style={{
                listStyle: "none",
              }}
            >
              <li
                style={{
                  display: "inline-block",
                  margin: "10px 10px",
                }}
              >
                <div>
                  <div>
                    <img src={img1} width="150px" height="150px" />
                  </div>
                  <div>
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      손동민
                    </span>
                  </div>
                </div>
              </li>
              <li
                style={{
                  display: "inline-block",
                  margin: "10px 10px",
                }}
              >
                <div>
                  <div>
                    <img src={img2} width="150px" height="150px" />
                  </div>
                  <div>
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      키즈
                    </span>
                  </div>
                </div>
              </li>
              <li
                style={{
                  display: "inline-block",
                  margin: "10px 10px",
                }}
              >
                <div>
                  <div>
                    <img src={img3} width="170px" height="150px" />
                  </div>
                  <div>
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      프로필 추가
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
