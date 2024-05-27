import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js";
import smoothscroll from "smoothscroll-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./fonts.css";
import AppCongress from "./AppCongress";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import LanguageContext from "./contexts/LanguageContext";
import ReactGA from "react-ga4";

// polyfill for smooth scrolling on safari / IE
smoothscroll.polyfill();

// ReactGA.initialize("G-KDVD6J5SQL");

ReactDOM.render(
  <React.StrictMode>
    <LanguageContext>
      <Router>
        <AppCongress />
      </Router>
    </LanguageContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
