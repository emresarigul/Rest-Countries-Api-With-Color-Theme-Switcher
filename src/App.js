import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/style/App.css";
import Content from "./components/Content";
import CountryInfo from "./components/CountryInfo";
import Header from "./components/Header";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchCountries = async () => {
    const response = await fetch(url);
    const countries = await response.json();
    setCountries(countries);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <Content
              countries={countries}
              countryName={countryName}
              setCountryName={setCountryName}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/country-detail/:id"
          element={
            <CountryInfo
              countryName={countryName}
              setCountryName={setCountryName}
              countries={countries}
              darkMode={darkMode}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
