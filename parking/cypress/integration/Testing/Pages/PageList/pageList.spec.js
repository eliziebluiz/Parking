describe("Test de renderização dos componentes na tela de listagem de historico", () => {
  it("Neste teste contém toda a parte de renderização dos componentes da página de historico", () => {
    cy.visit("/pagelist");
    cy.contains("Entrada").should("to.have.length", 1);
    cy.contains("Saida").should("to.have.length", 1);
    cy.contains("Parking").should("to.have.length", 1);
    cy.get("#logo").should("exist");
    cy.get(".header-left-pagehome").should("exist");
    cy.get("#Menu").should("exist");
    cy.get("#Menu").should("exist");
    cy.get(".placa-header").should("exist");
    cy.get(".container-pagelist").should("exist");
  });
});
