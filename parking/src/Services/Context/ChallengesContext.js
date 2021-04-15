import React from "react";
import { createContext, useState } from "react";

export const ChallengesContext = createContext({});

export function ChallengesProvider({ children }) {
  const [entrada, setEntrada] = useState(true);
  const [saida, setSaida] = useState(false);
  const [status, setStatus] = useState(true);
  const [numberPlaca, setNumberPlaca] = useState("");
  const [verifPlaca, setVerificPlaca] = useState(false);
  const [verificaPlaca, setVerificaPlaca] = useState("init");

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

  return (
    <ChallengesContext.Provider
      value={{
        entrada,
        setEntrada,
        saida,
        setSaida,
        status,
        setStatus,
        entry,
        said,
        numberPlaca,
        setNumberPlaca,
        verifPlaca,
        setVerificPlaca,
        verificaPlaca,
        setVerificaPlaca,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
