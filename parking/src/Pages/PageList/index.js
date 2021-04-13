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

  console.log(details);

  function capturaPlaca(date) {
    historico.forEach((element) => {
      if (date === element) {
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
            <Link to={details ? "/" : "#"} onClick={() => setDetails(true)}>
              <img src={Back} alt="" />
            </Link>
            <h3 style={{ display: details ? "inline" : "none" }}>{placa}</h3>
          </div>
          {details ? (
            <table>
              <tbody>
                {historico.length === 0 ? (
                  <div className="itens">
                    <h3 style={{ color: "var(--blue)" }}>
                      Nenhum histórico deste veiculo foi encontrado
                    </h3>
                  </div>
                ) : (
                  historico.map((carro) => (
                    <div className="box-list">
                      <th key={carro.plate} onClick={() => capturaPlaca(carro)}>
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
                    </div>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="box-list-details">
              <div className="itens-gerais-details">
                <div className="itens-details">
                  <label>PLACA</label>
                  <h3 style={{ fontSize: "38px", color: "var(--blue)" }}>
                    {dados.plate}
                  </h3>
                </div>
                <div className="itens-details">
                  <label>STATUS</label>
                  <h3>{dados.left ? "Não Estacionado" : "Estacionado"}</h3>
                </div>
                <div className="itens-details">
                  <label>TEMPO ATUAL</label>
                  <h3>{dados.time}</h3>
                </div>
                <div className="itens-details">
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
