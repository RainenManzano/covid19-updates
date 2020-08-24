import React, { memo, useState, useEffect, useContext } from "react";
// Contexts
import CasesContext from "../../context/CasesContext";
// Maps
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {
  const cases = useContext(CasesContext);
  const [minimumDomain, setMinimumDomain] = useState();
  const [maximumDomain, setMaximumDomain] = useState();
  const colorScale = scaleLinear()
    .domain([minimumDomain, maximumDomain])
    .range(["#f5d5d0", "#f72c07"]);
  // World Map Data
  useEffect(() => {
    let isMounted = true;
    if (cases.summary.length !== 0) {
      let max = 0;
      let min = 10000;
      for (let tempCase of cases.summary) {
        if (tempCase.cases > max) {
          max = tempCase.cases;
        }
        if (tempCase.cases < min) {
          min = tempCase.cases;
        }
      }
      if (isMounted) {
        setMinimumDomain(min);
        setMaximumDomain(max);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [cases.summary]);

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{
          rotate: [0, 0, 0],
          scale: 160,
        }}
      >
        {cases.summary.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = cases.summary.find((s) => {
                  return s
                    ? s.countryInfo.iso3 === geo.properties.ISO_A3 ||
                        s.countryInfo.iso2 === geo.properties.ISO_A2 ||
                        s.country === geo.properties.Name
                    : null;
                });
                return (
                  <Geography
                    key={geo.rsmKey}
                    fill={d ? colorScale(d["cases"]) : "#F5F4F6"}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      let cases = "";
                      if (d)
                        cases = d["cases"].toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        });
                      setTooltipContent(`${NAME} — ${cases}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      hover: {
                        fill: "#635050",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
