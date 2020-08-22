import React from "react";

import "./About.css";
import bg from "../../../assets/images/meeting.jpg";

const About = () => {
  const bannerStyle = {
    background: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };
  return (
    <div style={bannerStyle} id="aboutBanner">
      <h1>About us</h1>
      <div className="wrapper-content">
        <p>
          " Our mission is to deliver accurate updates in regards to COVID-19.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In
          fermentum et sollicitudin ac orci phasellus egestas tellus. Velit
          euismod in pellentesque massa placerat duis ultricies. Orci porta non
          pulvinar neque laoreet suspendisse. Ipsum dolor sit amet consectetur
          adipiscing elit. Faucibus ornare suspendisse sed nisi lacus sed
          viverra tellus. "
        </p>
      </div>
    </div>
  );
};

export default About;
