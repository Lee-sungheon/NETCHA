import React, { useState, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./Movie.scss";

const useStyles = makeStyles((theme) => ({}));

export default function Movie(props) {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    // props.toggleIsHeader(false);
    console.log(props.match.params.no);
    return () => {
      // props.toggleIsHeader(true);
    };
  }, []);
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
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            // src="http://j4f002.p.ssafy.io:8082/b"
            autoPlay={true}
            height="100%"
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
