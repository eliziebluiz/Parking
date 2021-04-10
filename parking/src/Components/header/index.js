/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import "./styles.css";

export default function Header() {
  return (
    <header className="header-pagehome">
      <div className="header-left-pagehome">
        <img id="logo" src={logo} alt="logo" />
        <h1>Parking</h1>
      </div>
      <div className="header-right-pagehome">
        <h3>
          <Link to="/">Entrada</Link>
        </h3>
        <h3>
          <Link to="/">Saida</Link>
        </h3>
      </div>
    </header>
  );
}
