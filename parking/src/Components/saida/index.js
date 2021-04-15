import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { verificaPlacaCSS } from "../../Services/mascaraPlaca";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";

import Swal from "sweetalert2";
import api from "../../Services/api";

import "./styles.css";

export default function Saida() {
  const {
    numberPlaca,
    setNumberPlaca,
    verifPlaca,
    setVerificPlaca,
    setVerificaPlaca,
  } = useContext(ChallengesContext);

  const history = useHistory();

  async function PagamentoVeiculo() {
    try {
      await api.post(`parking/${numberPlaca}/pay`);
      localStorage.setItem("placa", numberPlaca);
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
      title: "Confirmar o PAGAMENTO da placa abaixo?",
      text: numberPlaca,
      showCancelButton: true,
      confirmButtonColor: "var(--porple)",
      cancelButtonColor: "#DADADA",
      confirmButtonText: "CONFIRMAR",
      cancelButtonText: "VOLTAR",
    }).then((result) => {
      if (result.isConfirmed) {
        PagamentoVeiculo();
        Swal.fire("PAGO!", "Pagamento realizado com sucesso!", "success");
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
      title: "Confirmar a SAÍDA do veiculo da placa abaixo?",
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
