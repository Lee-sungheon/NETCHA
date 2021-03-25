import React, { useState } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import img1 from "../../img/icon1.png";
import img2 from "../../img/icon2.png";

const useStyles = makeStyles((theme) => ({
  account_page: {
    backgroundColor: "#f5f5f5",
    height: "100%",
    minHeight: "1000px",
  },
  account_box: {
    width: "90vw",
    maxWidth: "1024px",
    margin: "auto",
    paddingTop: "2vw",
  },
  account_div: {
    display: "flex",
    flexDirection: "row",
  },
  account_div_hd: {
    width: "25%",
  },
  account_div_section: {
    width: "75%",
  },
  account_div_section_div: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "1vw",
  },
  account_div_section_div2: {
    textAlign: "right",
    marginLeft: "auto",
  },
  divider: {
    marginTop: "1vw",
    marginBottom: "1vw",
  },
  membershipButton: {
    width: "60%",
    marginTop: "1vw",
    height: "40px",
  },
  profile_ul: {
    listStyle: "none",
    paddingLeft: "0",
  },
}));

export default function Account() {
  const classes = useStyles();
  return (
    <div className={classes.account_page}>
      <div className={classes.account_box}>
        <h1>계정</h1>
        <div>
          <Divider className={classes.divider} />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>멤버십 & 결제정보</div>
              <button className={classes.membershipButton}>멤버십 해지</button>
            </header>
            <section className={classes.account_div_section}>
              <div className={classes.account_div_section_div}>
                <div
                  style={{
                    width: "60%",
                  }}
                >
                  <div>asdsd9852@naver.com</div>
                  <div>비밀번호 : ********</div>
                  <div>전화번호 : 010-4528-9852</div>
                </div>

                <div className={classes.account_div_section_div2}>
                  <div>
                    <Link
                      href=""
                      style={{
                        textDecorationColor: "primary",
                      }}
                    >
                      이메일 주소 변경
                    </Link>
                  </div>
                  <div>
                    <Link href="">비밀번호 변경</Link>
                  </div>
                  <div>
                    <Link href="">휴대폰 번호 변경</Link>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider} />

              <div className={classes.account_div_section_div}>
                <div
                  style={{
                    width: "60%",
                  }}
                >
                  <div>신용카드 **** **** **** 6096</div>
                  <div>다음 결제일은 다음 결제일은 2021년 4월 14일입니다.</div>
                </div>

                <div className={classes.account_div_section_div2}>
                  <div>
                    <Link href="">결제 정보 관리</Link>
                  </div>
                  <div>
                    <Link href="">결제 상세 정보</Link>
                  </div>
                  <div>
                    <Link href="">결제일 변경</Link>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider} />

              <div className={classes.account_div_section_div}>
                <div account_div_section_div2>
                  <div>
                    <Link href="">기프트카드 또는 할인 코드 입력</Link>
                  </div>
                  <div>
                    <Link href="">기프트카드 판매처</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>멤버십 상세 정보</div>
            </header>
            <section className={classes.account_div_section}>
              <div className={classes.account_div_section_div}>
                <div>
                  <div>프리미엄</div>
                </div>
                <div className={classes.account_div_section_div2}>
                  <div>
                    <Link href="">멤버십 변경</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>설정</div>
            </header>
            <section className={classes.account_div_section}>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
              <div>
                <Link href="">Netflix 테스터로 참여</Link>
              </div>
            </section>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>프로필 & 자녀 보호 설정</div>
            </header>
            <section className={classes.account_div_section}>
              <ul className={classes.profile_ul}>
                <li>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>
                      <img src={img1} width="60px" height="60px" />
                    </div>
                    <div>
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        손동민
                      </span>
                    </div>
                  </div>
                </li>
                <Divider className={classes.divider} />

                <li>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>
                      <img src={img2} width="60px" height="60px" />
                    </div>
                    <div>
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        키즈
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
