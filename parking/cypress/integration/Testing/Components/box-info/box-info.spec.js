describe("Test no componente box-info", () => {
  it("should", () => {
    cy.visit("/");
    cy.contains("Entrada").should("to.have.length", 1);
  });
});
