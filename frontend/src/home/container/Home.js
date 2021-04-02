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

export default function Home() {
  const movieLists = useSelector((state) => state.home.movieLists);
  const isFilter = useSelector((state) => state.home.isFilter);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists && movieLists.length === 0) {
      dispatch(actions.requestMovieList());
    } else if (isFilter) {
      dispatch(actions.requestMovieList());
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
        <ContentBased loading={loading} idx={"slider-1"} />
        <PopularBased loading={loading} idx={"slider-2"} />
        <NewBased loading={loading} idx={"slider-3"} />
        <ContentBased loading={loading} idx={"slider-4"} />
        <PopularBased loading={loading} idx={"slider-5"} />
        <NewBased loading={loading} idx={"slider-6"} />
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
