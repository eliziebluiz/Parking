import React, { useState, useEffect } from "react";

import Header from "../../Components/header/index";

import Back from "../../assets/Shape.svg";

import "./styles.css";

import api from "../../Services/api";
import { Link } from "react-router-dom";
import Paginacao from "../../Components/paginacao/indice";

export default function PageHome() {
  const [historico, setHistorico] = useState([]);
  const [details, setDetails] = useState(true);
  const [dados, setDados] = useState("");
  const placa = localStorage.getItem("placa");

  const [paginaAtual, setPaginaAtual] = useState(1);

  const consultasPorPagina = 4;

  const indexUltimaConsulta = paginaAtual * consultasPorPagina;
  const indexPrimeiraConsulta = indexUltimaConsulta - consultasPorPagina;

  const historicoTabela = historico.slice(
    indexPrimeiraConsulta,
    indexUltimaConsulta
  );

  const paginar = (numero) => setPaginaAtual(numero);

  useEffect(() => {
    api
      .get(`/parking/${placa}`)
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((error) => console.log(error));
  }, [placa]);

  function capturaPlaca(date) {
    historico.forEach((element) => {
      if (date === element) {
        setDados(element);
        setDetails(false);
      }
    });
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
                    <h3 id="NenhumHistory">
                      Nenhum histórico deste veiculo foi encontrado
                    </h3>
                  </div>
                ) : (
                  historicoTabela.map((carro) => (
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
              <Paginacao
                style={{ display: details ? "inline" : "none" }}
                consultasPorPagina={consultasPorPagina}
                totalConsulta={historico.length}
                paginar={paginar}
              />
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
