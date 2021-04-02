import React, { useState, useEffect } from "react";
import Hls from "hls-server";
export default function Movie() {
  const video = document.getElementById("video");
  const videoSrc = "/videos/output.m3u8";

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(videoSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.onplay()
      })
    }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
      video.addEventListener('loademetadata', () => {
        video.play()
      })
    }
    return () => {};
    
  }, []);
  return (
    <div>
      <div
        style={{
          color: "white",
        }}
      >
        영상 재생
      </div>

      <div>
        <video id="video" width="500" height="500" controls></video>
      </div>
    </div>
  );
}
