import React from "react";
import "../../custom_CSS/loader.css";
import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <div className="loader">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
