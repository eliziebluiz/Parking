/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useState, useEffect } from "react";

import Header from "../../Components/header/index";

import "./styles.css";

import api from "../../Services/api";
import BoxInfo from "../../Components/box-info";

export default function PageHome() {
  const [, /*response*/ setResponse] = useState("");

  useEffect(() => {
    api
      .get("/parking/AaA-4444")
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <div className="container-pagehome">
        <BoxInfo />
      </div>
    </>
  );
}
