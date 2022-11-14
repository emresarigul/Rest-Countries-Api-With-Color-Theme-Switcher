import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/style/App.css";
import Content from "./components/Content";
import CountryInfo from "./components/CountryInfo";
import Header from "./components/Header";
import PageContextsProvider from "./context/context";
import { PageContexts } from "./context/context";

const url = "https://restcountries.com/v3.1/all";

function AppComponent() {
  const { setCountries } = useContext(PageContexts);

  const fetchCountries = async () => {
    const response = await fetch(url);
    const countriesData = await response.json();
    setCountries(countriesData);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/country-detail/:id" element={<CountryInfo />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <PageContextsProvider>
    <AppComponent />
  </PageContextsProvider>
);

export default App;
