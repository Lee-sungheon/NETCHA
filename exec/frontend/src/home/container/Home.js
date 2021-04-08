import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../component/banner/Banner";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { callApiEvaluation } from "../../common/api";
import { GANRES, COUNTRYS, KEYWORDS, loading } from "../../common/data";
import ContentBased from "../component/recommend/contentbased/ContentBased";
import NewBased from "../component/recommend/new/NewBased";
import PopularBased from "../component/recommend/popular/PopularBased";
import RankBased from "../component/recommend/rank/RankBased";
import MbtiBased from "../component/recommend/mbti/MbtiBased";
import GanreBased from "../component/recommend/ganre/GanreBased";
import GanreBased2 from "../component/recommend/ganre/GanreBased2";
import GanreBased3 from "../component/recommend/ganre/GanreBased3";
import CountryBased from "../component/recommend/country/CountryBased";
import CountryBased2 from "../component/recommend/country/CountryBased2";
import CountryBased3 from "../component/recommend/country/CountryBased3";
import KeywordBased from "../component/recommend/keyword/KeywordBased";
import KeywordBased2 from "../component/recommend/keyword/KeywordBased2";
import KeywordBased3 from "../component/recommend/keyword/KeywordBased3";
import { useHistory } from "react-router-dom";
import { navActions } from "../../navbar/state";
// import CreateReview from '../../common/review.js';

let loadingPage = false;
export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData.member);
  const history = useHistory();
  const [pageNum, setPageNum] = useState(1);
  const [isloading, setIsloading] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user.mbti) {
      history.push("/mbti");
      alert("MBTI 설정을 해주세요.");
      return;
    }
    async function fetchData() {
      const evalNum = await callApiEvaluation(user.seq);
      if (evalNum < 10) {
        alert("영화 추천을 위해서 영화 평가를 해주세요!");
        history.push(`/eval`);
      }
    }
    fetchData();
  }, [history, user]);
  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 1 >= scrollHeight && pageNum < 4) {
        if (!loadingPage) {
          setPageNum(pageNum + 1);
        }
        loadingPage = true;
        setIsloading(isloading + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    loadingPage = false;
    if (pageNum > 3) {
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNum, isloading]);
  return (
    <>
      <div className="home__top-bar__container">
        <div className="home__top-bar__area">
          <div className="home__top-bar__left"></div>
          <div className="home__top-bar__right">
            <Link to={"/home"}>
              <div className="home__top-bar__button1">
                <DehazeIcon />
              </div>
            </Link>
            <Link to={"/movielist"}>
              <div className="home__top-bar__button2">
                <ViewModuleIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Banner user={user} />
      <div className="home__container">
        <ContentBased loading={loading} idx={"slider-1"} user={user} />
        <MbtiBased loading={loading} idx={"slider-2"} user={user} />
        <NewBased loading={loading} idx={"slider-3"} user={user} />
        <PopularBased loading={loading} idx={"slider-4"} user={user} />
        <RankBased loading={loading} idx={"slider-5"} user={user} />
        {pageNum > 1 && (
          <>
            <GanreBased
              loading={loading}
              idx={`slider-6`}
              ganre={GANRES[0]}
              user={user}
            />
            <GanreBased2
              loading={loading}
              idx={`slider-7`}
              ganre={GANRES[1]}
              user={user}
            />
            <GanreBased3
              loading={loading}
              idx={`slider-8`}
              ganre={GANRES[2]}
              user={user}
            />
          </>
        )}
        {pageNum > 2 && (
          <>
            <CountryBased
              loading={loading}
              idx={`slider-9`}
              country={COUNTRYS[0]}
              user={user}
            />
            <CountryBased2
              loading={loading}
              idx={`slider-10`}
              country={COUNTRYS[1]}
              user={user}
            />
            <CountryBased3
              loading={loading}
              idx={`slider-11`}
              country={COUNTRYS[2]}
              user={user}
            />
          </>
        )}
        {pageNum > 3 && (
          <>
            <KeywordBased
              loading={loading}
              idx={`slider-12`}
              keyword={KEYWORDS[0]}
              user={user}
            />
            <KeywordBased2
              loading={loading}
              idx={`slider-13`}
              keyword={KEYWORDS[1]}
              user={user}
            />
            <KeywordBased3
              loading={loading}
              idx={`slider-14`}
              keyword={KEYWORDS[2]}
              user={user}
            />
          </>
        )}
      </div>
    </>
  );
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

shuffle(GANRES);
shuffle(COUNTRYS);
shuffle(KEYWORDS);
