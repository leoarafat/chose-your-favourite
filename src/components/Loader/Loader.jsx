import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default Loader;
