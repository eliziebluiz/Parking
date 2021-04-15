import React, { useContext } from "react";
import Swal from "sweetalert2";

import api from "../../Services/api";
import { verificaPlacaCSS } from "../../Services/mascaraPlaca";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";
import error from "../../assets/error.svg";
import errorGreen from "../../assets/error-green.svg";

import "./styles.css";

export default function Entrada() {
  const {
    numberPlaca,
    setNumberPlaca,
    verifPlaca,
    setVerificPlaca,
    verificaPlaca,
    setVerificaPlaca,
  } = useContext(ChallengesContext);

  async function cadastrarEntrada() {
    try {
      await api.post(
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
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este carro já está no parque",
      });
    }
  }

  return (
    <div className="form-box">
      <div id="formButton">
        <div id="inputPlaca">
          <input
            id={`input${verificaPlaca}`}
            value={numberPlaca}
            type="text"
            maxLength={8}
            className="inputPesquisa"
            placeholder="AAA-0000"
            onChange={(e) =>
              setNumberPlaca(
                verificaPlacaCSS(
                  e.target.value,
                  setVerificPlaca,
                  setVerificaPlaca
                )
              )
            }
          />
          <label className="labelPesquisa">Número da Placa:</label>
        </div>
        <div className={`error-placa${verificaPlaca}`}>
          <img
            id={`img-error`}
            src={verifPlaca ? errorGreen : error}
            alt="error"
          ></img>
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
