import React from "react";

// Components
import Link from "../Link/Link";

import "./NavBar.css";

const NavBar = (props) => {
  const links = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    // { name: "Contact", url: "/contact" },
  ];
  return (
    <header>
      <div className="wrapper">
        <div className="logo">
          <span className={props.className}>{props.siteName}</span>
        </div>
        <nav>
          {links.map((link, i) => {
            return (
              <Link
                url={link.url}
                name={link.name}
                activeClass="active-link"
                key={i}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
