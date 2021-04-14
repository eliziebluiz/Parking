export function validarPlaca(placa, setVerificPlaca) {
  const regexPlaca = /^[a-zA-Z]{3}-[0-9]{4}$/;

  const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

  const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

  if (regexPlaca.test(placa)) {
    setVerificPlaca(true);
  } else if (regexPlacaMercosulCarro.test(placa)) {
    setVerificPlaca(true);
  } else if (regexPlacaMercosulMoto.test(placa)) {
    setVerificPlaca(true);
  } else {
    setVerificPlaca(false);
  }
}

export function verificaPlacaCSS(value, setVerificPlaca) {
  value = value.replace(/(\d{3})?(\d{4})$/, "$1-$2");
  validarPlaca(value, setVerificPlaca);
  return value;
}
