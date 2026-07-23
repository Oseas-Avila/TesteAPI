const { Given, When, Then, Before, After } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../../pages/LoginPage");
const AccountInformationPage = require("../../../pages/AccountInformationPage");
const HeaderComponent = require("../../../pages/HeaderComponent");

const loginPage = new LoginPage();
const accountInfoPage = new AccountInformationPage();
const header = new HeaderComponent();

Before(function () {
  const timestamp = Date.now();
  this.testUser = {
    name: `QA Teste ${timestamp}`,
    email: `qa.teste.${timestamp}@teste.com.br`,
    password: "Teste@2026",
  };
  this.accountCreated = false;
});

After(function () {
  // Limpeza: remove a conta de teste criada durante o cenario, caso ainda esteja logada.
  if (this.accountCreated) {
    cy.get("body").then(($body) => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        header.deleteAccount();
      }
    });
  }
});

Given("que eu possuo uma conta cadastrada no site", function () {
  loginPage.open();
  loginPage.fillSignupNameAndEmail(this.testUser.name, this.testUser.email);
  loginPage.submitSignup();

  accountInfoPage.fillAccountInfo({ password: this.testUser.password });
  accountInfoPage.fillAddressInfo({
    firstName: "QA",
    lastName: "Teste",
    address1: "Rua de Teste, 123",
    state: "SP",
    city: "Sao Paulo",
    zipcode: "01000-000",
    mobileNumber: "11999999999",
  });
  accountInfoPage.createAccount();
  accountInfoPage.continueAfterAccountCreated();

  this.accountCreated = true;

  // Efetua logout para permitir que os proximos passos testem o fluxo de login isoladamente.
  header.logout();
});

When("eu realizo login com as credenciais da conta cadastrada", function () {
  loginPage.open();
  loginPage.login(this.testUser.email, this.testUser.password);
});

When("eu realizo login com o email {string} e senha {string}", function (email, password) {
  loginPage.open();
  loginPage.login(email, password);
});

Then("eu devo ver que estou logado com sucesso", function () {
  header.isLoggedInAs();
});

Then("uma mensagem de erro de login deve ser exibida", function () {
  loginPage.getLoginErrorMessage().should("contain.text", "incorrect");
});

module.exports = { loginPage, header };
