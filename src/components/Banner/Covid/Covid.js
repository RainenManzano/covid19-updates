import React from "react";

import "./Covid.css";
import img from "../../../assets/images/covid.jpg";

const Covid = (props) => {
  return (
    <div className="wrapper" id="banner-2">
      <div className="wrapper-content">
        <div className="picture-container">
          <img src={img} alt="" />
        </div>
        <div className="info">
          <h3>What on earth is COVID 19?</h3>
          <p>
            Coronavirus disease (COVID-19) is an infectious disease caused by a
            newly discovered coronavirus. Most people who fall sick with
            COVID-19 will experience mild to moderate symptoms and recover
            without special treatment.
          </p>
          <p>
            The virus that causes COVID-19 is mainly transmitted through
            droplets generated when an infected person coughs, sneezes, or
            exhales. These droplets are too heavy to hang in the air, and
            quickly fall on floors or surfaces.
          </p>
          <p>
            You can be infected by breathing in the virus if you are within
            close proximity of someone who has COVID-19, or by touching a
            contaminated surface and then your eyes, nose or mouth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Covid;
