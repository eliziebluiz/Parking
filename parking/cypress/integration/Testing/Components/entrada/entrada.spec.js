const random = Math.floor(Math.random() * (9999 - 1000) + 1000);

describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.request("POST", "https://parking-lot-to-pfz.herokuapp.com/parking", {
      plate: `ABC-${random}`,
    });
  });
});
