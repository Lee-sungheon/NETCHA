import React, { useState, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../../navbar/state";

import "./Movie.scss";

export default function Movie(props) {
  const [url, setUrl] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navActions.headerToggle(false));
    window.scroll(0, 0);
    return () => {
      dispatch(navActions.headerToggle(true));
    };
  }, [dispatch]);
  useEffect(() => {
    // props.toggleIsHeader(false);
    const params = props.match.params.no.split("-");
    if (params[0] === "banner") {
      setUrl(
        `https://dre3xbpyohrg0.cloudfront.net/banner${params[1]}/banner${params[1]}.m3u8`
      );
    } else if (params[0] === "movie") {
      setUrl(
        `https://dre3xbpyohrg0.cloudfront.net/MOVIE${params[1]}/MOVIE${params[1]}.m3u8`
      );
    } else {
      setUrl(`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`);
    }
  }, [props]);
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div>
      <div
        style={{
          height: "100vh",
          textAlign: "center",
          marginTop: "-64px",
        }}
      >
        <div
          className="movie-div"
          style={{
            position: "relative",
            height: "100%",
          }}
        >
          <ReactHlsPlayer
            id="player"
            src={url}
            // src="http://j4f002.p.ssafy.io:8082/b"
            autoPlay={true}
            // height="100%"
            style={{
              zIndex: "1",
              // position: "relative",
              top: 0,
              left: 0,
            }}
            controls
            hlsConfig={{
              startPosition: 0,
              // nextLoadPosition:
            }}
          ></ReactHlsPlayer>

          <div
            style={{
              zIndex: "2",
              position: "relative",
              color: "white",
              marginTop: "-90vh",
              marginLeft: "-90vw",
            }}
            onClick={goBack}
          >
            <ArrowBackIosIcon
              className="arrowBackButton"
              style={{
                height: "50px",
                width: "50px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
