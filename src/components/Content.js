import React, { useState, useContext, useEffect } from "react";
import "../style/Content.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { PageContexts } from "../context/context";

const Content = () => {
  const { darkMode, countries } = useContext(PageContexts);

  //const [searchCountry, setSearchCountry] = useState("");
  //const [region, setRegion] = useState("Filter by Region");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const initialState = { search: "", filter: "All" };

  const [searchRegion, setSearchRegion] = useState(initialState);

  const regions = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

  const handleChange = (e) => {
    setSearchRegion((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getFilteredRegions = (requestModel) => {
    return countries.filter(
      (country) =>
        (requestModel.filter === "All" ||
          country.region.includes(requestModel.filter)) &&
        (requestModel.search === "" ||
          country.name.common
            .toLowerCase()
            .includes(requestModel.search.toLowerCase()))
    );
  };

  useEffect(() => {
    if (countries.length > 0) {
      setFilteredCountries(countries);
    }
  }, [countries]);

  useEffect(() => {
    if (searchRegion.search || searchRegion.filter !== "All") {
      const data = getFilteredRegions(searchRegion);
      setFilteredCountries(data);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchRegion.search, searchRegion.filter]);

  /*
  old version
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
  };*/
  /*
  old version
  const countrySearchHandler = (e) => {
    setSearchCountry(e.target.value.toLowerCase());
  };*/

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
              name="search"
              onChange={handleChange}
              type="text"
              placeholder="Search for a country"
            />
          </div>
          <div className="right-filter">
            <div className="down-icon">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>

            <form action="">
              <select
                onChange={handleChange}
                name="filter"
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
          {filteredCountries.map((country, index) => {
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
