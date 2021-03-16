import React, { useState } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  account_box: {
    width: "90%",
    maxWidth: "1024px",
    margin: "auto",
    paddingTop: "15px",
  },
  account_div: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px",
    marginBottom: "10px",
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
    marginBottom: "10px",
  },
  account_div_section_div2: {
    textAlign: "right",
    marginLeft: "auto",
  },
}));

export default function Account() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100%",
        minHeight: "1000px",
      }}
    >
      <div className={classes.account_box}>
        <h1>계정</h1>
        <div>
          <Divider />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>멤버십 & 결제정보</div>
              <button
                style={{
                  width: "60%",
                  marginTop: "10px",
                  height: "40px",
                }}
              >
                멤버십 해지
              </button>
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
                        // textDecorationLine: "underlineHover",
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
              <Divider />

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
              <Divider />

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
          <Divider />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>멤버십 상세 정보</div>
            </header>
            <section className={classes.account_div_section}>
              <div className={classes.account_div_section_div}>
                <div
                  style={{
                    width: "60%",
                  }}
                >
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
          <Divider />
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
          <Divider />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>프로필 & 자녀 보호 설정</div>
            </header>
            <section className={classes.account_div_section}>
              <div>
                <Link href="">프로필1</Link>
              </div>
              <Divider />
              <div>
                <Link href="">프로필2</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
