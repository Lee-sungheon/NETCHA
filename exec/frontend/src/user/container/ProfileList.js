import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import img1 from "../../img/icon1.png";
import img2 from "../../img/icon2.png";
import img3 from "../../img/icon3.png";

const useStyles = makeStyles((theme) => ({
  profileList_page: { width: "100%", height: "900px", marginTop: "200px" },
  profileList_div: { width: "", height: "340px", margin: "0 auto" },

  profileList_text: {
    color: "white",
    fontSize: "3vw",
    textAlign: "center",
  },

  profileList_div_div: {
    margin: "auto",
    height: "300px",
    textAlign: "center",
    marginTop: "20px",
  },
  profileList_ul: {
    listStyle: "none",
  },
  profileList_li: {
    display: "inline-block",
    margin: "10px 10px",
  },
}));
export default function ProfileList(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.profileList_page}>
        <div className={classes.profileList_div}>
          <div className={classes.profileList_text}>
            Netcha를 시청할 프로필을 선택하세요.
          </div>
          <div className={classes.profileList_div_div}>
            <ul className={classes.profileList_ul}>
              <li className={classes.profileList_li}>
                <div>
                  <div>
                    <img src={img1} alt="" width="150px" height="150px" />
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
              <li className={classes.profileList_li}>
                <div>
                  <div>
                    <img src={img2} alt="" width="150px" height="150px" />
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
              <li className={classes.profileList_li}>
                <div>
                  <div>
                    <img src={img3} alt="" width="170px" height="150px" />
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
