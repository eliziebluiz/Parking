/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../Services/api";

import "./styles.css";

export default function BoxInfo() {
  const [numberPlaca, setNumberPlaca] = useState("");
  const [status, setStatus] = useState(true);
  const [entrada, setEntrada] = useState(true);
  const [saida, setSaida] = useState(false);
  const [verifPlaca, setVerificPlaca] = useState(false);

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
      Swal.fire("Registrado!", "Seja bem-vindo", "success");
      console.log(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este carro já está no parque",
      });
    }
  }

  async function PagamentoVeiculo() {
    try {
      await api.post(`parking/${numberPlaca}/pay`);
      Swal.fire("PAGO!", "Pagamento realizado com sucesso!", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo está errado",
      });
    }
  }

  function alertPagamento() {
    Swal.fire({
      title: "Confirmar o pagamento da placa abaixo?",
      text: numberPlaca,
      showCancelButton: true,
      confirmButtonColor: "var(--porple)",
      cancelButtonColor: "#DADADA",
      confirmButtonText: "CONFIRMAR",
      cancelButtonText: "VOLTAR",
    }).then((result) => {
      if (result.isConfirmed) {
        PagamentoVeiculo();
      }
    });
  }

  async function SaidaVeiculo() {
    try {
      await api.post(`parking/${numberPlaca}/out`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      Swal.fire("SAIDA LIBERADA!", "Saída realizado com sucesso!", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo está errado",
      });
    }
  }

  function alertSaida() {
    Swal.fire({
      title: "Confirmar a saida do veiculo da placa abaixo?",
      text: numberPlaca,
      showCancelButton: true,
      confirmButtonColor: "var(--porple)",
      cancelButtonColor: "#DADADA",
      confirmButtonText: "CONFIRMAR",
      cancelButtonText: "VOLTAR",
    }).then((result) => {
      if (result.isConfirmed) {
        SaidaVeiculo();
      }
    });
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
                  onClick={() => alertPagamento()}
                >
                  PAGAMENTO
                </button>
                <button
                  className="botao-grande"
                  id={`saida${verifPlaca}`}
                  onClick={() => alertSaida()}
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
