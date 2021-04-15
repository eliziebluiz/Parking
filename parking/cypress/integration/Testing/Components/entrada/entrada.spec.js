const random = Math.floor(Math.random() * (9999 - 1000) + 1000);

describe("Teste de integração com o back-end", () => {
  it("Funcionamento da resposta do back-end", () => {
    cy.request("POST", "https://parking-lot-to-pfz.herokuapp.com/parking", {
      plate: `ABC-${random}`,
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
    });
  });
});
