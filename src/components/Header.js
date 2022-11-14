import React, { useContext } from "react";
import "../style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { PageContexts } from "../context/context";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(PageContexts);

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className={`header-wrapper ${!darkMode ? "" : "dark"}`}>
      <div className="container">
        <div className="header-flex-content">
          <div className="logo-title">
            <h1>Where in the World?</h1>
          </div>
          <div onClick={darkModeHandler} className="theme-mode">
            {darkMode ? (
              <div className="dark-light-mode">
                <FontAwesomeIcon className="sun-icon" icon={faSun} />
                <span className="light">Light Mode</span>
              </div>
            ) : (
              <div className="dark-light-mode">
                <FontAwesomeIcon className="moon-icon" icon={faMoon} />
                <span className="dark">Dark Mode</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
