/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React from "react";

import logo from "../../assets/logo.svg";
import Menu from "../Menu";

import "./styles.css";

export default function Header() {
  return (
    <header className="header-pagehome">
      <div className="header-left-pagehome">
        <img id="logo" src={logo} alt="logo" />
        <h1 id="parking">Parking</h1>
      </div>
      <Menu />
    </header>
  );
}
