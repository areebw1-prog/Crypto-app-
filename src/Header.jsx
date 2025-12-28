import React from "react";
import "./styles.css";

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo-section">
        <img 
          src="https://rapidapi-prod-apis.s3.amazonaws.com/c3736925-9c98-4fdc-857e-07c11146afb7.png" 
          alt="Logo" 
          className="header-logo"
        />
        <h1 className="header-title">CryptoCurrency</h1>
      </div>
    </header>
  );
}
