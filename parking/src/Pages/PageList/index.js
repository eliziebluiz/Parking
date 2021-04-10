/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useState, useEffect } from "react";

import Header from "../../Components/header/index";

import Back from "../../assets/Shape.svg";

import "./styles.css";

import api from "../../Services/api";
import { Link } from "react-router-dom";

export default function PageHome() {
  const [historico, setHistorico] = useState([]);
  const [details, setDetails] = useState(true);
  const [dados, setDados] = useState("");
  const placa = localStorage.getItem("placa");
  useEffect(() => {
    api
      .get(`/parking/${placa}`)
      .then((response) => {
        console.log(response.data);
        setHistorico(response.data);
      })
      .catch((error) => console.log(error));
  }, [placa]);

  //ABC-3450

  console.log(details);

  function capturaPlaca(placa) {
    historico.forEach((element) => {
      if (placa === element.plate) {
        setDados(element);
        setDetails(false);
      }
    });
    console.log(dados);
  }

  return (
    <>
      <Header />
      <div className="box-external">
        <div className="container-pagelist">
          <div className="placa-header">
            <Link to="/">
              <img src={Back} alt="" />
            </Link>
            <h3>{placa}</h3>
          </div>
          {details ? (
            <div className="box-list">
              <table>
                <tbody>
                  {historico.map((carro) => (
                    <th
                      key={carro.plate}
                      onClick={() => capturaPlaca(carro.plate)}
                    >
                      <div className="itens-gerais">
                        <div className="itens">
                          <label>TEMPO ATUAL</label>
                          <h3>{carro.time}</h3>
                        </div>
                        <div className="itens">
                          <label>PAGAMENTO</label>
                          <h3>{carro.paid ? "Pago" : "__"}</h3>
                        </div>
                      </div>
                    </th>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="box-list">
              <div className="itens-gerais">
                <div className="itens">
                  <label>PLACA</label>
                  <h3>{dados.plate}</h3>
                </div>
                <div className="itens">
                  <label>STATUS</label>
                  <h3>{dados.left}</h3>
                </div>
                <div className="itens">
                  <label>TEMPO ATUAL</label>
                  <h3>{dados.time}</h3>
                </div>
                <div className="itens">
                  <label>PAGAMENTO</label>
                  <h3>{dados.paid ? "Pago" : "__"}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
