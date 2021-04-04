import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./Banner.scss";
import ReactHlsPlayer from "react-hls-player";
import SoundButton from "./SoundButton";
import { useHistory } from "react-router";

export default function Banner() {
  const history = useHistory();
  const SoundToggle = () => {
    const player = document.getElementById("player");
    // setMuted(!muted);
    player.muted = !player.muted;
  };
  const playMovie = () => {
    history.push({
      pathname: "/movie",
    });
  };
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
          marginTop: "-64px",
        }}
      >
        {/* <img
          src="https://occ-0-4807-395.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbOymx7zApiRkB4v8RlqPyDcTKk403CX_3kF9AmSltYMW-7mOI54Rimond4ElEj5huQMTf_nPAiJYViyei3JdEij4PoF.webp?r=4cc"
          alt=""
          style={{
            width: "100%",
            height: "50vw",
          }}
        ></img>
        <div
          style={{
            position: "absolute",
            top: "5vw",
            left: "4vw",
            height: "15vw",
          }}
        >
          <img
          alt=""
            src="https://occ-0-4807-395.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABayFpKfZqCUtNe5E0pNrPhwiRpAgV7qgAc_IkgdykFa4sAlCPPWS5glC3X03016gjvGvrP63jWF3l8ZJCNNNcr5xubXcms6zPQTm.webp?r=441"
            style={{
              height: "100%",
            }}
          ></img>
          <div
            style={{
              marginTop: "10px",
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
              오늘 한국에서 콘텐츠 순위 3위
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "1.3em",
                width: "33vw",
              }}
            >
              누구더냐,탄지로에게 칼을 들게 한 자가. 산에 사는 화목한 숯장수
              가족에게 닥친 참극. 살아남은 아이는 복수를 위해 세상의 혈귀를
              모조리 베어 버릴 검사가 된다.
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  width: "8vw",
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "25px",
                  height: "45px",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                }}
              >
                ▶ 재생
              </Button>
              <Button
                variant="contained"
                style={{
                  width: "9vw",
                  backgroundColor: "gray",
                  color: "white",
                  marginTop: "25px",
                  height: "45px",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  marginLeft: "10px",
                }}
              >
                상세정보
              </Button>
            </div>
          </div>
        </div> */}
        <div
          style={{
            width: "100%",
            height: "49.25vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ReactHlsPlayer
            id="player"
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            autoPlay={true}
            width="100%"
            height="auto"
            style={{
              zIndex: "1",
            }}
            muted
            loop
            hlsConfig={{
              startPosition: 10,
              // nextLoadPosition:
            }}
          />
        </div>
      </div>
      <div
        onClick={SoundToggle}
        style={{
          color: "black",
          position: "absolute",
          marginLeft: "90vw",
          top: "35vw",
        }}
      >
        <SoundButton />
      </div>
      <div
        style={{
          position: "absolute",
          top: "25vw",
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
          오늘 한국에서 콘텐츠 순위 3위
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.3em",
            width: "33vw",
          }}
        >
          누구더냐,탄지로에게 칼을 들게 한 자가. 산에 사는 화목한 숯장수
          가족에게 닥친 참극. 살아남은 아이는 복수를 위해 세상의 혈귀를 모조리
          베어 버릴 검사가 된다.
        </div>
        <div>
          <Button
            variant="contained"
            style={{
              width: "8vw",
              backgroundColor: "white",
              color: "black",
              marginTop: "25px",
              height: "45px",
              fontWeight: "bold",
              fontSize: "1.3em",
            }}
            onClick={playMovie}
          >
            ▶ 재생
          </Button>
          <Button
            variant="contained"
            style={{
              width: "9vw",
              backgroundColor: "gray",
              color: "white",
              marginTop: "25px",
              height: "45px",
              fontWeight: "bold",
              fontSize: "1.3em",
              marginLeft: "10px",
            }}
          >
            상세정보
          </Button>
        </div>
      </div>
    </div>
  );
}
