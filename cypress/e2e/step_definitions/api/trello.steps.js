const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const TrelloApiClient = require("../../../api/TrelloApiClient");

const trelloClient = new TrelloApiClient();

When("eu envio um GET para a action {string} do Trello", function (actionId) {
  trelloClient.getAction(actionId).as("trelloResponse");
});

Then("o status code da resposta deve ser {int}", function (expectedStatus) {
  cy.get("@trelloResponse").its("status").should("eq", expectedStatus);
});

Then("o campo {string} da estrutura {string} deve ser exibido", function (field, structure) {
  cy.get("@trelloResponse").then((response) => {
    const value = response.body.data[structure][field];
    expect(value, `${structure}.${field}`).to.exist;
    cy.log(`Campo "${structure}.${field}" = ${value}`);
  });
});
