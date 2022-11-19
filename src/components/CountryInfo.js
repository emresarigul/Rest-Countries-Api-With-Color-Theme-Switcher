import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/CountryInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PageContexts } from "../context/context";

const CountryInfo = () => {
  const { countries, darkMode } = useContext(PageContexts);

  const { id } = useParams();

  // finds the selected country
  let currentCountry = countries.filter((country) => {
    return country.cca3.includes(id);
  });

  // finds the selected country borders
  let currentCountryBorders = currentCountry[0]?.borders;

  let currentCountryBordersWithKeys = [];

  /*if current country has a border then
  it finds the names of the border countries from
  their borderkeys and pushes to empty array*/
  if (currentCountryBorders !== undefined) {
    for (let i = 0; i < countries.length; i++) {
      for (let k = 0; k < countries.length; k++) {
        if (countries[i].cca3.includes(currentCountryBorders[k])) {
          currentCountryBordersWithKeys.push({
            name: countries[i].name.common,
            specialKey: countries[i].cca3,
          });
        }
      }
    }
  }

  return (
    <div className={`country-info-wrapper ${!darkMode ? "" : "dark"}`}>
      <div className="container">
        <Link to="/">
          <div className="back-to-main-page">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </div>
        </Link>
        {countries
          .filter((country) => {
            return country.cca3.includes(id);
          })
          .map((element, index) => {
            let nativeName = element.name.nativeName
              ? Object.values(element.name.nativeName)
              : "";
            let currencies = element.currencies
              ? Object.values(element.currencies)
              : "";
            let languages = element.languages
              ? Object.values(element.languages)
              : "";
            let borders = element.borders;

            return (
              <div key={index} className="info-flex-wrapper">
                <div className="selected-country-flag">
                  <img src={element.flags.svg} alt="" />
                </div>
                <div className="selected-country-info">
                  <div className="selected-country-name">
                    {element.name.common}
                  </div>
                  <div className="other-selected-infos">
                    <div className="left">
                      <div className="sub-infos">
                        <span> Native Name:</span>
                        {nativeName.length ? nativeName[0].official : ""}
                      </div>
                      <div className="sub-infos">
                        <span>Population:</span>
                        {element.population.toLocaleString()}
                      </div>
                      <div className="sub-infos">
                        <span>Region:</span> {element.region}
                      </div>
                      <div className="sub-infos">
                        <span>Sub Region:</span> {element.subregion}
                      </div>
                      <div className="sub-infos">
                        <span>Capital:</span> {element.capital}
                      </div>
                    </div>
                    <div className="right">
                      <div className="sub-infos">
                        <span>Top Level Domain:</span> {element.tld}
                      </div>
                      <div className="sub-infos">
                        <span>Currencies:</span>
                        {currencies.length ? currencies[0].name : ""}
                      </div>
                      <div className="sub-infos language">
                        <span>Languages:</span>
                        {languages.length
                          ? languages.map((language, index) => {
                              return (
                                <div key={index}>
                                  {index === languages.length - 1
                                    ? language
                                    : language + ","}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="border-wrapper">
                    <div className="border-title">Border Countries:</div>
                    <div className="border-countries">
                      {borders !== undefined ? (
                        currentCountryBordersWithKeys.map((border, index) => {
                          return (
                            <Link
                              to={`/country-detail/${border.specialKey}`}
                              key={index}
                            >
                              <div>{border.name}</div>
                            </Link>
                          );
                        })
                      ) : (
                        <div> There is no border </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CountryInfo;
