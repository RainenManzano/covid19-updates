import React from "react";

import "./Technologies.css";
import reactImg from "../../../assets/images/react.png";
import htmlImg from "../../../assets/images/html5.jpg";
import cssImg from "../../../assets/images/css3.jpg";
import bg from "../../../assets/images/coding.jpg";

const Technologies = () => {
  const bannerStyle = {
    background: `url(${bg})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  };
  const imgStyle = {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const reactPicture = {
    background: `url(${reactImg})`,
    ...imgStyle,
  };
  const htmlPicture = {
    background: `url(${htmlImg})`,
    ...imgStyle,
  };
  const cssPicture = {
    background: `url(${cssImg})`,
    ...imgStyle,
  };

  return (
    <div className="wrapper" id="banner-3" style={bannerStyle}>
      <h1>Technologies Used</h1>
      <div className="wrapper-content padding-top">
        <div style={reactPicture} className="technology"></div>
        <div style={htmlPicture} className="technology"></div>
        <div style={cssPicture} className="technology"></div>
      </div>
    </div>
  );
};

export default Technologies;
