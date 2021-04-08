import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./Banner.scss";
import ReactHlsPlayer from "react-hls-player";
import SoundButton from "./SoundButton";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "../../../home/state";
import { BANNER } from "../../../common/data";

let buffer = null;
let bufferTime = 0;
export default function Banner() {
  const bannerToggle = useSelector((state) => state.home.bannerToggle);
  const bannerBufferTime = useSelector((state) => state.home.bannerBufferTime);
  const token = useSelector((state) => state.user.userData.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const SoundToggle = () => {
    const player = document.getElementById("player");
    player.muted = !player.muted;
  };
  const playMovie = () => {
    history.push({
      pathname: `/movie/banner-${BANNERKEY[0]}`,
    });
  };
  useEffect(() => {
    buffer = setInterval(function () {
      bufferTime += 1;
    }, 1000);
    return clearInterval(buffer);
  }, []);
  useEffect(() => {
    if (!bannerToggle) {
      dispatch(actions.setValue("bannerBufferTime", bufferTime));
    } else {
      bufferTime = bannerBufferTime;
    }
  }, [bannerToggle, dispatch, bannerBufferTime]);
  return (
    <div
      style={{
        height: "43vw",
        fontSize: "1vw",
      }}
    >
      <div
        className="banner"
        style={{
          position: "relative",
          textAlign: "right",
          marginTop: "-82px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "49.25vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {
            <ReactHlsPlayer
              id="player"
              src={`https://dre3xbpyohrg0.cloudfront.net/banner${BANNERKEY[0]}/banner${BANNERKEY[0]}.m3u8`}
              autoPlay={bannerToggle}
              width="100%"
              height="auto"
              style={{
                zIndex: "1",
              }}
              state="play"
              muted
              disablePictureInPicture
              loop
              hlsConfig={{
                startPosition: bannerBufferTime,
              }}
            />
          }
        </div>
        <div
          style={{
            position: "absolute",
            top: "15vw",
            left: "4vw",
            color: "white",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontWeight: "bold",

              fontSize: "2em",
            }}
          >
            오늘 한국에서 콘텐츠 순위 {BANNERKEY[0] === "" && 1}
            {BANNERKEY[0]}위
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "1.3em",
              width: "33vw",
            }}
          >
            {BANNER[BANNERKEY[0]][1]}
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                width: "9vw",
                backgroundColor: "white",
                color: "black",
                marginTop: "25px",
                height: "2.5vw",
                fontWeight: "bold",
                fontSize: "1.3em",
              }}
              onClick={playMovie}
            >
              ▶ 재생
            </Button>
            <a
              href={`https://netcha-pedia.netlify.app/movieDetail/${
                BANNER[BANNERKEY[0]][0]
              }/${token}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="contained"
                style={{
                  width: "11vw",
                  backgroundColor: "gray",
                  color: "white",
                  marginTop: "25px",
                  height: "2.5vw",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  marginLeft: "10px",
                }}
              >
                상세정보
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div
        onClick={SoundToggle}
        style={{
          color: "black",
          position: "absolute",
          marginLeft: "90vw",
          top: "35vw",
          zIndex: 99,
        }}
      >
        <SoundButton />
      </div>
    </div>
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

const BANNERKEY = Object.keys(BANNER);
shuffle(BANNERKEY);
