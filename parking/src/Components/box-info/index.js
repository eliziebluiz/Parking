import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChallengesContext } from "../../Services/Context/ChallengesContext";

import Entrada from "../entrada";
import Saida from "../saida";

import "./styles.css";

export default function BoxInfo() {
  const { entrada, saida, status, entry, said } = useContext(ChallengesContext);

  return (
    <div className="container-box-info" data-testid="entrada">
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
