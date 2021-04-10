/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";

import loading from "../../assets/loading.svg";
import api from "../../Services/api";

import "./styles.css";

export default function BoxInfo() {
  const [numberPlaca, setNumberPlaca] = useState("");
  const [status, setStatus] = useState(true);
  const [entrada, setEntrada] = useState(true);
  const [saida, setSaida] = useState(false);
  const [verifPlaca, setVerificPlaca] = useState(false);
  const [control, setControl] = useState(true);

  async function cadastrarEntrada() {
    console.log(numberPlaca);
    try {
      const response = await api.post(
        "parking",
        { plate: numberPlaca },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setControl(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function PagamentoVeiculo() {
    try {
      const response = await api.post(`parking/${numberPlaca}/pay`);
      console.log(response.data);
      setControl(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function SaidaVeiculo() {
    try {
      const response = await api.post(`parking/${numberPlaca}/out`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setControl(true);
    } catch (err) {
      console.log(err);
    }
  }

  function entry() {
    setStatus(true);
    setEntrada(true);
    setSaida(false);
  }

  function said() {
    setStatus(false);
    setEntrada(false);
    setSaida(true);
  }

  function validarPlaca(placa) {
    var resposta = "placa inválida";

    const regexPlaca = /^[a-zA-Z]{3}-[0-9]{4}$/;

    const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

    const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

    if (regexPlaca.test(placa)) {
      resposta = "Placa válida no formato atual";
      setVerificPlaca(true);
      console.log(resposta);
    } else if (regexPlacaMercosulCarro.test(placa)) {
      resposta = "Placa válida (padrão Mercosul - carro)";
      setVerificPlaca(true);
      console.log(resposta);
    } else if (regexPlacaMercosulMoto.test(placa)) {
      resposta = "Placa válida (padrão Mercosul - moto)";
      setVerificPlaca(true);
      console.log(resposta);
    } else {
      setVerificPlaca(false);
    }

    console.log(resposta);
  }

  function verificaPlacaCSS(value) {
    validarPlaca(value);
    return value;
  }

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
        {status ? (
          <>
            {control ? (
              <div className="form-box" action="" onSubmit={cadastrarEntrada}>
                <div id="formButton">
                  <div id="inputPlaca">
                    <input
                      value={numberPlaca}
                      type="text"
                      maxLength="8"
                      className="inputPesquisa"
                      placeholder="AAA-0000"
                      onChange={(e) =>
                        setNumberPlaca(verificaPlacaCSS(e.target.value))
                      }
                    />
                    <label className="labelPesquisa">Número da Placa:</label>
                  </div>
                  <button
                    className="botao-grande"
                    id={`placa${verifPlaca}`}
                    onClick={() => cadastrarEntrada()}
                  >
                    CONFIRMAR ENTRADA
                  </button>
                </div>
              </div>
            ) : (
              <div className="loading">
                <img src={loading} alt="Loading" />
                <h1>Registrando...</h1>
              </div>
            )}
          </>
        ) : (
          <div className="form-box" action="" onSubmit={cadastrarEntrada}>
            <div id="formButton">
              <div id="inputPlaca">
                <input
                  value={numberPlaca}
                  type="text"
                  maxLength="8"
                  className="inputPesquisa"
                  placeholder="AAA-0000"
                  onChange={(e) =>
                    setNumberPlaca(verificaPlacaCSS(e.target.value))
                  }
                />
                <label className="labelPesquisa">Número da Placa:</label>
              </div>
              <div className="conjuntoButton">
                <button
                  className="botao-grande"
                  id={`pagamento${verifPlaca}`}
                  onClick={() => PagamentoVeiculo()}
                >
                  PAGAMENTO
                </button>
                <button
                  className="botao-grande"
                  id={`saida${verifPlaca}`}
                  onClick={() => SaidaVeiculo()}
                >
                  SAÍDA
                </button>
                <Link id="historico">VER HISTÓRICO</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
