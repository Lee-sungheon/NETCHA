import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import img1 from "../../img/icon1.png";
import img2 from "../../img/icon2.png";
import { useSelector } from "react-redux";

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
  link_: {
    color: "#42a5f5",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
const onButtonClick = () => {
  alert("서비스 준비중입니다.");
};
export default function AccountMain() {
  const classes = useStyles();
  const { mbti, userId, phone, nickname, name } = useSelector((state) => ({
    mbti: state.user.userData.member.mbti,
    userId: state.user.userData.member.userId,
    phone: state.user.userData.member.phone,
    nickname: state.user.userData.member.nickname,
    name: state.user.userData.member.name,
  }));
  return (
    <div className={classes.account_page}>
      <div className={classes.account_box}>
        <h1>계정</h1>
        <div>
          <Divider className={classes.divider} />
          <div className={classes.account_div}>
            <header className={classes.account_div_hd}>
              <div>멤버십 & 결제정보</div>
              <button
                className={classes.membershipButton}
                onClick={onButtonClick}
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
                  <div>{userId}</div>
                  <div>이름 : {name}</div>
                  <div>닉네임 : {nickname}</div>
                  <div>
                    전화번호 : {phone.substring(0, 3)}-{phone.substring(3, 7)}-
                    {phone.substring(7, 11)}
                  </div>
                  <div>MBTI : {mbti} </div>
                </div>

                <div className={classes.account_div_section_div2}>
                  <div>
                    <Link className={classes.link_}>이메일 주소 변경</Link>
                  </div>
                  <div>
                    <br />
                  </div>
                  <div>
                    <Link
                      to="/account/changeninkname"
                      className={classes.link_}
                    >
                      닉네임 변경
                    </Link>
                  </div>

                  <div>
                    <Link to="/account/changephone" className={classes.link_}>
                      휴대폰 번호 변경
                    </Link>
                  </div>
                  <div>
                    <Link to="mbti" className={classes.link_}>
                      MBTI 변경
                    </Link>
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
                  <div>신용카드 **** **** **** ****</div>
                  <div>다음 결제일은 다음 결제일은 2021년 4월 14일입니다.</div>
                </div>

                <div className={classes.account_div_section_div2}>
                  <div>
                    <Link className={classes.link_} onClick={onButtonClick}>
                      결제 정보 관리
                    </Link>
                  </div>
                  <div>
                    <Link className={classes.link_} onClick={onButtonClick}>
                      결제 상세 정보
                    </Link>
                  </div>
                  <div>
                    <Link className={classes.link_} onClick={onButtonClick}>
                      결제일 변경
                    </Link>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider} />

              <div className={classes.account_div_section_div}>
                <div account_div_section_div2>
                  <div>
                    <Link className={classes.link_} onClick={onButtonClick}>
                      기프트카드 또는 할인 코드 입력
                    </Link>
                  </div>
                  <div>
                    <Link className={classes.link_} onClick={onButtonClick}>
                      기프트카드 판매처
                    </Link>
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
                    <Link className={classes.link_} onClick={onButtonClick}>
                      멤버십 변경
                    </Link>
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
                <Link className={classes.link_} onClick={onButtonClick}>
                  Netcha 테스터로 참여
                </Link>
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
                    onClick={onButtonClick}
                  >
                    <div>
                      <img src={img1} alt="" width="60px" height="60px" />
                    </div>
                    <div>
                      <span
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {name}
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
                    onClick={onButtonClick}
                  >
                    <div>
                      <img src={img2} alt="" width="60px" height="60px" />
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
