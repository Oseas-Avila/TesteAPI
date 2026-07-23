const BasePage = require("./BasePage");

/**
 * Page Object da pagina "/login" (Login + inicio de cadastro).
 */
class LoginPage extends BasePage {
  open() {
    this.visit("/login");
    return this;
  }

  fillSignupNameAndEmail(name, email) {
    cy.get('[data-qa="signup-name"]').clear().type(name);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    return this;
  }

  submitSignup() {
    cy.get('[data-qa="signup-button"]').click();
    return this;
  }

  login(email, password) {
    cy.get('[data-qa="login-email"]').clear().type(email);
    cy.get('[data-qa="login-password"]').clear().type(password);
    cy.get('[data-qa="login-button"]').click();
    return this;
  }

  getLoginErrorMessage() {
    return cy.get(".login-form p", { timeout: 10000 });
  }
}

module.exports = LoginPage;
