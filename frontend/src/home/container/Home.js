import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../component/banner/banner";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { actions } from "../state";
import { useSelector, useDispatch } from "react-redux";
import "./Home.scss";
import ContentBased from "../component/recommend/contentbased/ContentBased";
import NewBased from "../component/recommend/new/NewBased";
import PopularBased from "../component/recommend/popular/PopularBased";
import RankBased from "../component/recommend/rank/RankBased";
import GanreBased from "../component/recommend/ganre/GanreBased";
import GanreBased2 from "../component/recommend/ganre/GanreBased2";
import GanreBased3 from "../component/recommend/ganre/GanreBased3";
import CountryBased from "../component/recommend/country/CountryBased";
import CountryBased2 from "../component/recommend/country/CountryBased2";
import CountryBased3 from "../component/recommend/country/CountryBased3";
import KeywordBased from "../component/recommend/keyword/KeywordBased";
import KeywordBased2 from "../component/recommend/keyword/KeywordBased2";
import KeywordBased3 from "../component/recommend/keyword/KeywordBased3";

export default function Home() {
  const movieLists = useSelector(state => state.home.movieLists);
  const isFilter = useSelector(state => state.home.isFilter);
  const user = useSelector(state => state.user.userData.member);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieLists.length === 0) {
      dispatch(actions.requestMovieList(0, 0));
    } else if (isFilter) {
      dispatch(actions.requestMovieList(0, 0));
      dispatch(actions.setIsFilter(false));
    }
  }, []);

  return (
    <>
      <div className="home__top-bar__container">
        <div className="home__top-bar__area">
          <div className="home__top-bar__left"></div>
          <div className="home__top-bar__right">
            <Link to={"/"}>
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
      <Banner />
      <div className="home__container">
        <ContentBased loading={loading} idx={"slider-1"} user={user}/>
        <PopularBased loading={loading} idx={"slider-2"} user={user}/>
        <NewBased loading={loading} idx={"slider-3"} user={user}/>
        <RankBased loading={loading} idx={"slider-4"} user={user}/>
        <GanreBased loading={loading} idx={`slider-5`} ganre={GANRES[0]} user={user}/>
        <GanreBased2 loading={loading} idx={`slider-6`} ganre={GANRES[1]} user={user}/>
        <GanreBased3 loading={loading} idx={`slider-7`} ganre={GANRES[2]} user={user}/>
        <CountryBased loading={loading} idx={`slider-8`} country={COUNTRYS[0]} user={user}/> 
        <CountryBased2 loading={loading} idx={`slider-9`} country={COUNTRYS[1]} user={user}/> 
        <CountryBased3 loading={loading} idx={`slider-10`} country={COUNTRYS[2]} user={user}/> 
        <KeywordBased loading={loading} idx={`slider-11`} keyword={KEYWORDS[0]} user={user}/> 
        <KeywordBased2 loading={loading} idx={`slider-12`} keyword={KEYWORDS[1]} user={user}/> 
        <KeywordBased3 loading={loading} idx={`slider-13`} keyword={KEYWORDS[2]} user={user}/> 
      </div>
    </>
  );
}

const loading = [
  {
    no: 1,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
  {
    no: 2,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
  {
    no: 3,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
  {
    no: 4,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
  {
    no: 5,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
  {
    no: 6,
    imageUrl: ["/images/loading.gif"],
    title: "",
  },
];

const GANRES = [
  '어드벤처', '공포', '활극', '뮤지컬', '뮤직', '문화', '인권', '아동', '액션', '에로', '드라마', 
  '멜로', '로드무비', '판타지', '공포(호러)', '전쟁', '범죄', '모험', '애니메이션', '군사', '스릴러', 
  '스포츠', '애정', '전기', '신파', '코메디', '기록', '하이틴(고교)', '교육', '역사', '과학', 
  '무협', '미스터리', 'SF', '자연ㆍ환경', '로맨스', '인물', '갱스터', '가족', '시대극/사극', 
  '재난', '실험', '첩보', '느와르', '종교', '사회', '옴니버스', '서부'
]

const COUNTRYS = [
  '프랑스', '오스트리아', '일본', '오스트레일리아', '태국', '인도네시아', '이스라엘', '포르투칼',
  '러시아', '콜롬비아', '아이슬란드', '네덜란드', '스위스', '아르헨티나', '이탈리아', '독일', '싱가포르',
  '베트남', '인도', '체코', '미국', '폴란드', '중국', '사우디아라비아', '네팔', '스페인', '터키',
  '필리핀', '남아프리카공화국', '이집트', '우크라이나', '캐나다', '벨기에', '영국', '홍콩', '대한민국', '북한',
]

const KEYWORDS = [
  '음모', '마피아', '탈출', '형사', '추적', '복수', '테러', '구출', '뮤지션', '결혼', '시리즈', '부부', '탐정',
  '소설원작', '돈', '정치', '정글', '인질', '학교', '공항', '숲', '초현실', '리메이크'
]
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