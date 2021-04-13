/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useContext } from "react";
import Swal from "sweetalert2";

import api from "../../Services/api";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";

import "./styles.css";

export default function Entrada() {
  const {
    numberPlaca,
    setNumberPlaca,
    verifPlaca,
    setVerificPlaca,
  } = useContext(ChallengesContext);

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

  function validarPlaca(placa) {
    var resposta = "placa inválida";

    const regexPlaca = /^[a-zA-Z]{3}-[0-9]{4}$/;

    const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

    const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

    if (regexPlaca.test(placa)) {
      resposta = "Placa válida no formato atual";
      setVerificPlaca(true);
    } else if (regexPlacaMercosulCarro.test(placa)) {
      resposta = "Placa válida (padrão Mercosul - carro)";
      setVerificPlaca(true);
    } else if (regexPlacaMercosulMoto.test(placa)) {
      resposta = "Placa válida (padrão Mercosul - moto)";
      setVerificPlaca(true);
    } else {
      setVerificPlaca(false);
    }

    console.log(resposta);
  }

  function verificaPlacaCSS(value) {
    value = value.replace(/(\d{3})?(\d{4})$/, "$1-$2");
    validarPlaca(value);
    return value;
  }

  return (
    <div className="form-box">
      <div id="formButton">
        <div id="inputPlaca">
          <input
            value={numberPlaca}
            type="text"
            maxLength="8"
            className="inputPesquisa"
            placeholder="AAA-0000"
            onChange={(e) => setNumberPlaca(verificaPlacaCSS(e.target.value))}
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
  );
}
