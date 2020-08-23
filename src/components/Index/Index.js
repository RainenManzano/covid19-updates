import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

// Components
import NavBar from "../NavBar/NavBar";
import AsyncComponent from "../../hoc/asyncComponent";

// Axios
import CovidApi from "../../axios/covid19";
import CountriesAPI from "../../axios/Countries";

// Contexts
import CasesContext from "../../context/CasesContext";

// Assets
import "./Index.css";

const Index = () => {
  const [summary, setSummary] = useState([]);
  const [tempSummary, setTempSummary] = useState([]);
  const value = { summary };
  // async pages
  const asyncHome = AsyncComponent(() => {
    return import("../pages/home/home");
  });
  const asyncAbout = AsyncComponent(() => {
    return import("../pages/about/about");
  });
  // COVID API
  useEffect(() => {
    let isMounted = true;
    CovidApi({
      method: "get",
      url: "summary",
    })
      .then((response) => {
        // console.log("Covid API", response.data);
        if (isMounted) {
          setTempSummary(response.data);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, []);

  // COUNTRIES FLAG
  useEffect(() => {
    let isMounted = true;
    CountriesAPI({
      method: "get",
      url: "/",
      params: {
        fields: "name;flag",
      },
    })
      .then((response) => {
        // console.log("Countries API", response.data);
        const tempArray = [];
        if (tempSummary.Countries) {
          for (let countryData of tempSummary.Countries) {
            const flag = response.data.find(
              (country) => country.name === countryData.Country
            );
            const newCountry = { ...countryData, ...flag };
            tempArray.push(newCountry);
          }
          const object = {
            Countries: tempArray,
            Date: tempSummary.Date,
            Global: tempSummary.Global,
          };
          if (isMounted) {
            setSummary(object);
          }
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, [tempSummary]);

  return (
    <>
      <NavBar siteName="COVID 19 UPDATES" className="logoText" />
      <CasesContext.Provider value={value}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path="/" component={asyncHome} exact />
          <Route path="/about-us" component={asyncAbout} exact />
          <Route
            path="/contact"
            render={() => {
              return <h1>Contact</h1>;
            }}
            exact
          />
        </AnimatedSwitch>
      </CasesContext.Provider>
      <NavBar siteName="Copyright 2020" className="" />
    </>
  );
};

export default Index;
