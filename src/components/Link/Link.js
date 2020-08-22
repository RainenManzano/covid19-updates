import React from "react";
import { NavLink } from "react-router-dom";

import "./Link.css";

const Link = (props) => {
  return (
    <NavLink exact to={props.url} activeClassName={props.activeClass}>
      {props.name}
    </NavLink>
  );
};

export default Link;
