describe("Teste de renderização dos componentes na tela inicial", () => {
  it("Neste teste contém toda a parte de renderização dos componentes da página inicial", () => {
    cy.visit("/");
    cy.contains("Entrada").should("to.have.length", 1);
    cy.contains("Saida").should("to.have.length", 1);
    cy.contains("Parking").should("to.have.length", 1);
    cy.get("#logo").should("exist");
    cy.get(".header-left-pagehome").should("exist");
    cy.get("#Menu").should("exist");
    cy.get("#Menu").should("exist");
    cy.get("#indicEntradatrue").should("exist");
    cy.get("#indicSaidafalse").should("exist");
    cy.get("#formButton").should("exist");
    cy.get(".inputPesquisa").should("exist");
    cy.get(".botao-grande").should("exist");
  });
});
