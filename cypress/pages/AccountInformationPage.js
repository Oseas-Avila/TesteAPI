const BasePage = require("./BasePage");

/**
 * Page Object da pagina "Enter Account Information" (preenchida apos o Signup),
 * exibida em "/signup" depois do envio do nome/e-mail iniciais.
 */
class AccountInformationPage extends BasePage {
  fillAccountInfo({ password, day = "10", month = "5", year = "1995" }) {
    cy.get("#id_gender1").check({ force: true });
    cy.get("#password").type(password);
    cy.get("#days").select(day);
    cy.get("#months").select(month);
    cy.get("#years").select(year);
    return this;
  }

  fillAddressInfo({
    firstName,
    lastName,
    company = "QA Automation",
    address1,
    address2 = "",
    country = "United States",
    state,
    city,
    zipcode,
    mobileNumber,
  }) {
    cy.get("#first_name").type(firstName);
    cy.get("#last_name").type(lastName);
    cy.get("#company").type(company);
    cy.get("#address1").type(address1);
    if (address2) {
      cy.get("#address2").type(address2);
    }
    cy.get("#country").select(country);
    cy.get("#state").type(state);
    cy.get("#city").type(city);
    cy.get("#zipcode").type(zipcode);
    cy.get("#mobile_number").type(mobileNumber);
    return this;
  }

  createAccount() {
    cy.get('[data-qa="create-account"]').click();
    return this;
  }

  continueAfterAccountCreated() {
    cy.get('[data-qa="continue-button"]', { timeout: 10000 }).click();
    return this;
  }
}

module.exports = AccountInformationPage;
