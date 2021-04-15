export function validarPlaca(placa, setVerificPlaca, setVerificaPlaca) {
  const regexPlaca = /^[a-zA-Z]{3}-[0-9]{4}$/;

  const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

  const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;
  console.log(placa);

  if (regexPlaca.test(placa)) {
    setVerificPlaca(true);
    setVerificaPlaca(true);
  } else if (regexPlacaMercosulCarro.test(placa)) {
    setVerificPlaca(true);
    setVerificaPlaca(true);
  } else if (regexPlacaMercosulMoto.test(placa)) {
    setVerificPlaca(true);
    setVerificaPlaca(true);
  } else if (placa === "") {
    setVerificaPlaca("init");
  } else {
    setVerificPlaca(false);
    setVerificaPlaca(false);
  }
}

export function verificaPlacaCSS(value, setVerificPlaca, setVerificaPlaca) {
  if (value.length < 7) {
    value = value.replace("-", "");
  } else {
    value = value.replace(/(\d{3})?(\d{4})$/, "$1-$2");
  }
  console.log(value.length);

  validarPlaca(value, setVerificPlaca, setVerificaPlaca);

  return value;
}
