/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";

import Entrada from "../../Components/entrada";
import Saida from "../saida";

import "./styles.css";

export default function BoxInfo() {
  const { entrada, saida, status, entry, said } = useContext(ChallengesContext);

  return (
    <div className="container-box-info">
      <div className="container-box">
        <div className="indicadores">
          <Link id={`indicEntrada${entrada}`} onClick={() => entry()}>
            Entrada
          </Link>
          <Link id={`indicSaida${saida}`} onClick={() => said()}>
            Saida
          </Link>
        </div>
        {status ? <Entrada /> : <Saida />}
      </div>
    </div>
  );
}
