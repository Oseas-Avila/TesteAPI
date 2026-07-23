/**
 * Cliente de API (POO) para o Trello, encapsulando as chamadas usadas nos testes.
 */
class TrelloApiClient {
  constructor(baseUrl = Cypress.env("apiBaseUrl") || "https://api.trello.com") {
    this.baseUrl = baseUrl;
  }

  getAction(actionId) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/1/actions/${actionId}`,
      failOnStatusCode: false,
    });
  }
}

module.exports = TrelloApiClient;
