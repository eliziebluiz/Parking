import React from "react";

import logo from "../../assets/logo.svg";
import Menu from "../menu";

import "./styles.css";

export default function Header() {
  return (
    <header className="header-pagehome">
      <div className="header-left-pagehome">
        <img id="logo" src={logo} alt="logo" />
        <h1 id="parking" data-testid="title">
          Parking
        </h1>
      </div>
      <Menu />
    </header>
  );
}
