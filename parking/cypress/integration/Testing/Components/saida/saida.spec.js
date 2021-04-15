const placa = "ABT-1236"; //Essa placa tem que ser de um carro que esteja no banco

describe("Teste de integração com o back-end", () => {
  it("Funcionamento da resposta do back-end", () => {
    cy.request(
      "POST",
      `https://parking-lot-to-pfz.herokuapp.com/parking/${placa}/pay`
    ).then((resposta) => {
      expect(resposta.status).to.eq(204);
    });
  });
});

describe("Teste de integração com o back-end", () => {
  it("Funcionamento da resposta do back-end", () => {
    cy.request(
      "POST",
      `https://parking-lot-to-pfz.herokuapp.com/parking/${placa}/out`
    ).then((resposta) => {
      expect(resposta.status).to.eq(204);
    });
  });
});
