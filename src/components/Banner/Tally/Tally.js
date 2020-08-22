import React, { useEffect, useState, useContext } from "react";
import AnimatedNumber from "react-animated-number";

import "./Tally.css";
import bg from "../../../assets/images/background.jpg";

// Components
import Table from "../../../UI/Table";

// API
import IpIdentifier from "../../../axios/IpIdentifier";
import IpLocator from "../../../axios/IpLocator";

// Contexts
import CasesContext from "../../../context/CasesContext";

const getCountryCases = (country, data) => {
  const countryCases = data.filter((obj) => {
    return obj.Country === country ? obj : false;
  });
  return countryCases;
};

const Tally = (props) => {
  const casesContext = useContext(CasesContext);
  const [ipAddress, setIpAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [apiDate, setApiDate] = useState(null);

  const [newConfirmed, setnewConfirmed] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [newDeaths, setNewDeaths] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [newRecovered, setNewRecovered] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [activeCases, setActiveCases] = useState(0);

  // Getting IP Address
  useEffect(() => {
    let isMounted = true;
    IpIdentifier({ method: "get" })
      .then((response) => {
        const ipRawData = response.data;
        let ipData = ipRawData.split("\n");
        ipData = ipData.filter((data) => {
          return data.indexOf("ip") !== -1 ? data : false;
        });
        ipData = ipData[0].split("=")[1];
        if (isMounted) {
          setIpAddress(ipData);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      isMounted = false;
    };
  }, []);

  // Getting IP's Location
  useEffect(() => {
    let isMounted = true;
    if (ipAddress !== null) {
      IpLocator({
        method: "get",
        params: {
          q: ipAddress,
        },
      }).then((ipInfo) => {
        // Getting the country
        if (isMounted) {
          // console.log(ipInfo);
          ipInfo = ipInfo.data.split("\n");
          ipInfo = ipInfo.filter((info) => {
            return info.indexOf("Country") !== -1 ? info : false;
          });
          if (!ipInfo[0]) setCountry("Philippines");
          else setCountry(ipInfo[0].split(":")[1].trim());
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [ipAddress]);

  // Setting confirmed, deaths, and recovered data
  useEffect(() => {
    let isMounted = true;
    // console.log(ipAddress, country);
    if (ipAddress !== null && country !== null) {
      if (casesContext.summary.Countries) {
        const cases = getCountryCases(country, casesContext.summary.Countries);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        // console.log("Cases", cases);
        const tempDate = new Date(cases[0].Date);
        let apiDateString = `${
          months[tempDate.getMonth()]
        } ${tempDate.getDate()}, ${tempDate.getFullYear()}`;
        if (isMounted) {
          setApiDate(apiDateString);
          setnewConfirmed(cases[0].NewConfirmed);
          setTotalConfirmed(cases[0].TotalConfirmed);
          setNewDeaths(cases[0].NewDeaths);
          setTotalDeaths(cases[0].TotalDeaths);
          setNewRecovered(cases[0].NewRecovered);
          setTotalRecovered(cases[0].TotalRecovered);
          setActiveCases(
            cases[0].TotalConfirmed -
              (cases[0].TotalDeaths + cases[0].TotalRecovered)
          );
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [ipAddress, country, casesContext.summary]);

  const formatValue = (value) =>
    value.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  const duration = 3000;
  let tableHeadings = ["CASES", "NEW", "TOTAL"];
  let tableRows = [
    [
      { data: "CONFIRMED", tdClass: "cases" },
      {
        data: (
          <AnimatedNumber
            value={newConfirmed}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "cases",
      },
      {
        data: (
          <AnimatedNumber
            value={totalConfirmed}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "text-yellow",
      },
    ],
    [
      { data: "DEATHS", tdClass: "cases" },
      {
        data: (
          <AnimatedNumber
            value={newDeaths}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "cases",
      },
      {
        data: (
          <AnimatedNumber
            value={totalDeaths}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "text-red",
      },
    ],
    [
      { data: "RECOVERED", tdClass: "cases" },
      {
        data: (
          <AnimatedNumber
            value={newRecovered}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "cases",
      },
      {
        data: (
          <AnimatedNumber
            value={totalRecovered}
            style={{
              transition: "0.8s ease-out",
              transitionProperty: "color, opacity",
            }}
            duration={duration}
            formatValue={formatValue}
          />
        ),
        tdClass: "text-green",
      },
    ],
  ];

  const bannerStyle = {
    background: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="banner" style={bannerStyle}>
      <h2>COVID-19</h2>
      <h3 id="tallyTitle">Tally of {country} Cases</h3>
      <h6>AS OF {apiDate}</h6>
      <Table
        id="tally"
        tableClass="text-white"
        headings={tableHeadings}
        rows={tableRows}
      />
      <p id="active-cases">
        ACTIVE CASES &nbsp;&nbsp;
        <AnimatedNumber
          component="span"
          value={activeCases}
          className="active-number"
          style={{
            transition: "0.8s ease-out",
            transitionProperty: "color, opacity",
          }}
          duration={duration}
          formatValue={formatValue}
        />
      </p>
    </div>
  );
};

export default Tally;
