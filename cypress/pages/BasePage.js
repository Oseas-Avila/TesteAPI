/**
 * Classe base para o padrao Page Object.
 * Todas as paginas do site devem herdar desta classe.
 */
class BasePage {
  visit(path = "/") {
    cy.visit(path);
    return this;
  }
}

module.exports = BasePage;
