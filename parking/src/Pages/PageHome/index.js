import React from "react";

import Header from "../../Components/header/index";

import "./styles.css";

import BoxInfo from "../../Components/box-info";

export default function PageHome() {
  return (
    <>
      <Header />
      <div className="container-pagehome">
        <BoxInfo />
      </div>
    </>
  );
}
