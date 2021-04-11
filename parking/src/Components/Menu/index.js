import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import close from "../../assets/close.svg";

import "./styles.css";

import { ChallengesContext } from "../../Services/Context/ChallengesContext";

export default function Menu() {
  const [ativo, setAtivo] = useState(false);

  const { entry, said } = useContext(ChallengesContext);

  return (
    <>
      <div className="Menu" onClick={() => setAtivo(true)}>
        <div className="BarraMenu"></div>
        <div className="BarraMenu"></div>
        <div className="BarraMenu"></div>
      </div>

      <div className={`ContainerMenu${ativo}`} id="Menu">
        <Link
          style={{ display: ativo ? "" : "none" }}
          onClick={() => setAtivo(false)}
        >
          <img src={close} alt="Close"></img>
        </Link>
        <div className="header-right-pagehome">
          <h3>
            <Link
              to="/"
              onClick={() => {
                entry();
                setAtivo(false);
              }}
            >
              Entrada
            </Link>
          </h3>
          <h3>
            <Link
              to="/"
              onClick={() => {
                said();
                setAtivo(false);
              }}
            >
              Saida
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
