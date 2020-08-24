import React, { useState, useContext, useEffect } from "react";
import AnimatedNumber from "react-animated-number";
// Components
import Table from "../../../UI/Table";
// Contexts
import CasesContext from "../../../context/CasesContext";
// Assets
import "./World.css";
import bg from "./../../../assets/images/world.jpg";

const World = (props) => {
  const casesContext = useContext(CasesContext);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [rows, setRows] = useState([]);
  const bannerStyle = {
    background: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };
  const duration = 3000;
  const formatValue = (value) =>
    value.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  let headings = ["Country", "", "Cases", "Recovered", "Deaths"];

  // Global Cases (Total, Deaths, Recoveries)
  useEffect(() => {
    let isMounted = true;
    // console.log(casesContext.summary);
    if (casesContext.summary.length != 0) {
      // console.log("World Context", casesContext.summary.Global);
      let globalCases = 0;
      let globalRecovered = 0;
      let globalDeaths = 0;
      const tableRows = [];
      for (let country of casesContext.summary) {
        globalCases += country.cases;
        globalRecovered += country.recovered;
        globalDeaths += country.deaths;
        tableRows.push([
          {
            data: <span>{country.country}</span>,
            tdClass: "",
          },
          {
            data: (
              <img
                src={country.countryInfo.flag}
                style={{ width: "40%" }}
                alt="flag"
              />
            ),
            tdClass: "",
          },
          {
            data: country.cases.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
            tdClass: "",
          },
          {
            data: country.recovered.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
            tdClass: "",
          },
          {
            data: country.deaths.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
            tdClass: "",
          },
        ]);
      }
      if (isMounted) {
        setRows(tableRows);
        setCases(globalCases);
        setDeaths(globalDeaths);
        setRecoveries(globalRecovered);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [casesContext.summary]);

  return (
    <div id="global-banner" style={bannerStyle}>
      <div className="half-width">
        <h2 className="text-white pl weight-500 bt bl br">Global Cases</h2>
        <h1 className="text-white weight-900 text-center bb br bl pb text-yellow number">
          <AnimatedNumber
            value={cases}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        </h1>
        <div className="half-width half-cases">
          <h2 className="text-white weight-500 br bl text-center">Recovered</h2>
          <h2 className="text-white weight-900 br bl text-center pb bb text-green number">
            <AnimatedNumber
              value={recoveries}
              style={{
                transition: "0.8s ease-out",
                transitionProperty: "color, opacity",
              }}
              duration={duration}
              formatValue={formatValue}
            />
          </h2>
        </div>
        <div className="half-width half-cases">
          <h2 className="text-white weight-500 br text-center">Deaths</h2>
          <h2 className="text-white weight-900 br text-center pb bb text-red number">
            <AnimatedNumber
              value={deaths}
              style={{
                transition: "0.8s ease-out",
                transitionProperty: "color, opacity",
              }}
              duration={duration}
              formatValue={formatValue}
            />
          </h2>
        </div>
        <h2 className="text-white weight-500 text-center lh-50">
          List of Countries
        </h2>
        <Table id="countriesTable" headings={headings} rows={rows} />
      </div>
      <div className="half-width">
        <h2 className="text-white pl weight-500 lh-50">WORLD MAP</h2>
      </div>
    </div>
  );
};

export default World;
