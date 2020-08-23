import React from "react";

import About from "../../Banner/About/About";
import Covid from "../../Banner/Covid/Covid";
import Technologies from "../../Banner/Technologies/Technologies";

import "./about.css";

const about = () => {
  return (
    <>
      <About />
      <Covid />
      <Technologies />
    </>
  );
};

export default about;
