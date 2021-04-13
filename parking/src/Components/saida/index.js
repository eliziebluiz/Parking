/*
Data de criação: 18/08/2020;
Autor: Elizieb Luiz;
Descrição: Página de configuração, responsável por editar os dados de uma clinica.
*/

import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../Services/api";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";
import "./styles.css";

export default function Saida() {
  const {
    numberPlaca,
    setNumberPlaca,
    verifPlaca,
    setVerificPlaca,
  } = useContext(ChallengesContext);

  const history = useHistory();

  async function PagamentoVeiculo() {
    try {
      await api.post(`parking/${numberPlaca}/pay`);
      localStorage.setItem("placa", numberPlaca);
      Swal.fire("PAGO!", "Pagamento realizado com sucesso!", "success");
      alertSaida();
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
      history.push("/pagelist");
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
          <Link
            to="/pagelist"
            id={`historico${verifPlaca}`}
            onClick={() => {
              localStorage.setItem("placa", numberPlaca);
            }}
          >
            VER HISTÓRICO
          </Link>
        </div>
      </div>
    </div>
  );
}
