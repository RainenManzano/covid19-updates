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
  // console.log(data);
  const countryCases = data.filter((obj) => {
    return obj.country === country ? obj : false;
  });
  return countryCases;
};

const Tally = (props) => {
  const casesContext = useContext(CasesContext);
  const [ipAddress, setIpAddress] = useState(null);
  const [country, setCountry] = useState(localStorage.getItem("country"));
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
    if (!country) {
      // console.log("Getting IP Address");
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
    }
    return () => {
      isMounted = false;
    };
  }, [country]);

  // Getting IP's Location
  useEffect(() => {
    let isMounted = true;
    if (ipAddress !== null && !country) {
      // console.log("Getting IP Location");
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
          else {
            let countryName = ipInfo[0].split(":")[1].trim();
            setCountry(countryName);
            localStorage.setItem("country", countryName);
          }
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [ipAddress, country]);

  // Setting confirmed, deaths, and recovered data
  useEffect(() => {
    let isMounted = true;
    if (country && casesContext.summary.length > 0) {
      // console.log("Setting");
      // console.log("Raw Cases", casesContext.summary);
      const cases = getCountryCases(country, casesContext.summary);
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
      const tempDate = new Date();
      let DateString = `${
        months[tempDate.getMonth()]
      } ${tempDate.getDate()}, ${tempDate.getFullYear()}`;
      if (isMounted) {
        setApiDate(DateString);
        setnewConfirmed(cases[0].todayCases ? cases[0].todayCases : 0);
        setTotalConfirmed(cases[0].cases ? cases[0].cases : 0);
        setNewDeaths(cases[0].todayDeaths ? cases[0].todayDeaths : 0);
        setTotalDeaths(cases[0].deaths ? cases[0].deaths : 0);
        setNewRecovered(cases[0].todayRecovered ? cases[0].todayRecovered : 0);
        setTotalRecovered(cases[0].recovered ? cases[0].recovered : 0);
        setActiveCases(cases[0].active ? cases[0].active : 0);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [country, casesContext.summary]);

  const formatValue = (value) =>
    value.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  const duration = 2000;
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
