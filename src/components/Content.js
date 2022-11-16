import React, { useState, useContext } from "react";
import "../style/Content.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PageContexts } from "../context/context";

const Content = () => {
  const { darkMode, countries } = useContext(PageContexts);

  const [searchCountry, setSearchCountry] = useState("");
  const [region, setRegion] = useState("Filter by Region");

  const regions = [
    "Filter by Region",
    "All",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const regionHandler = (element) => {
    if (
      (element === "All" || element === "Filter by Region") &&
      searchCountry.trim() === ""
    ) {
      return countries;
    } else if (
      (element === "All" || element === "Filter by Region") &&
      searchCountry.trim() !== ""
    ) {
      return countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry)
      );
    } else if (
      (element !== "All" || element !== "Filter by Region") &&
      searchCountry.trim() === ""
    ) {
      return countries.filter((country) => country.region.includes(region));
    } else if (
      (element !== "All" || element !== "Filter by Region") &&
      searchCountry.trim() !== ""
    ) {
      return countries.filter(
        (country) =>
          country.region.includes(region) &&
          country.name.common.toLowerCase().includes(searchCountry)
      );
    }
  };

  const countrySearchHandler = (e) => {
    setSearchCountry(e.target.value.toLowerCase());
  };

  return (
    <div className={`content-wrapper ${!darkMode ? "" : "dark"}`}>
      <div className="container">
        <div className="country-search-wrapper">
          <div className="left-search">
            <div className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className="country-searchbox"
              onChange={countrySearchHandler}
              type="text"
              placeholder="Search for a country"
            />
          </div>
          <div className="right-filter">
            <form action="">
              <select
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
                name="continents"
                id="continents"
                className="continent-container"
              >
                {regions.map((region, index) => {
                  return (
                    <option value={region} key={index}>
                      {region}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>

        <div className="countries-flex-wrapper">
          {regionHandler(region).map((country, index) => {
            return (
              <Link
                className="mb-4"
                to={`/country-detail/${country.cca3}`}
                key={index}
              >
                <div className="country-box" key={index}>
                  <div className="country-flag">
                    <img src={country.flags.png} alt="" />
                  </div>
                  <div className="country-info">
                    <div className="country-name">{country.name.common}</div>
                    <div className="country-population">
                      Population:
                      <span>{country.population.toLocaleString()}</span>
                    </div>
                    <div className="country-region">
                      Region: <span>{country.region}</span>
                    </div>
                    <div className="country-capital">
                      Capital: <span>{country.capital}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
