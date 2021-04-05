import React from "react";
import ReactLoading from "react-loading";

function Loader({ type, color, message }) {
  return (
    <div class="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2 style={{marginLeft: "-20px", color: "white"}}>{message}</h2>
        <ReactLoading type={type} color={color} height={"50%"} width={"50%"} />
      </div>
    </div>
  );
}
export default Loader;
