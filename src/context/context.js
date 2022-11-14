import { createContext, useState } from "react";

export const PageContexts = createContext();

function PageContextsProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  return (
    <PageContexts.Provider
      value={{
        countryName,
        setCountryName,
        darkMode,
        setDarkMode,
        countries,
        setCountries,
      }}
    >
      {children}
    </PageContexts.Provider>
  );
}

export default PageContextsProvider;
