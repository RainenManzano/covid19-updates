import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

// Components
import NavBar from "../NavBar/NavBar";
import Tally from "../Banner/Tally/Tally";
import World from "../Banner/World/World";
import About from "../Banner/About/About";
import Covid from "../Banner/Covid/Covid";
import Technologies from "../Banner/Technologies/Technologies";

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
          <Route
            path="/"
            render={() => {
              return (
                <>
                  <Tally />
                  <World />
                </>
              );
            }}
            exact
          />
          <Route
            path="/about-us"
            render={() => {
              return (
                <>
                  <About />
                  <Covid />
                  <Technologies />
                </>
              );
            }}
            exact
          />
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
