const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const ProductsPage = require("../../../pages/ProductsPage");
const CartPage = require("../../../pages/CartPage");
const CheckoutPage = require("../../../pages/CheckoutPage");

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

When("eu busco pelo produto {string}", function (term) {
  this.searchTerm = term;
  productsPage.open();
  productsPage.searchProduct(term);
});

Then("a pagina deve exibir os resultados da busca", function () {
  productsPage.getSearchedProductsTitle().should("be.visible");
  productsPage.getAllProductCards().should("have.length.greaterThan", 0);
});

When("eu adiciono o primeiro produto encontrado ao carrinho", function () {
  productsPage
    .getAllProductCards()
    .first()
    .find(".productinfo p")
    .invoke("text")
    .then((name) => {
      this.addedProductName = name.trim();
    });
  productsPage.addProductToCartByIndex(0);
});

When("eu sigo para a tela do carrinho", function () {
  productsPage.goToCartFromModal();
});

Then("o produto adicionado deve estar listado no carrinho", function () {
  cartPage.shouldContainProduct(this.addedProductName);
});

When("eu prossigo para a tela de pagamento", function () {
  cartPage.proceedToCheckout();
});

Then("os produtos do carrinho devem estar visiveis na tela de pagamento", function () {
  checkoutPage.shouldBeOnCheckoutPage();
  checkoutPage.shouldContainProduct(this.addedProductName);
});
