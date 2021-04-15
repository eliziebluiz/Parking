import React from "react";
import "./styles.css";

export default function Paginacao({
  consultasPorPagina,
  totalConsulta,
  paginar,
}) {
  const numerosPagina = [];

  for (let i = 1; i <= Math.ceil(totalConsulta / consultasPorPagina); i++) {
    numerosPagina.push(i);
  }
  console.log(numerosPagina);

  return (
    <nav id="paginacao">
      {numerosPagina.map((numero) => (
        <button
          key={numero}
          className="btn-paginacao"
          type="button"
          onClick={() => {
            paginar(numero);
          }}
        >
          {numero}
        </button>
      ))}
    </nav>
  );
}
