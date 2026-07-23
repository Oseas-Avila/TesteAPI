const CartPage = require("./CartPage");

/**
 * Page Object da pagina "/checkout" (tela de pagamento / revisao do pedido).
 * Reaproveita os seletores da tabela de itens do CartPage, pois a estrutura
 * da tabela de revisao do pedido e identica a da pagina de carrinho.
 */
class CheckoutPage extends CartPage {
  open() {
    this.visit("/checkout");
    return this;
  }

  shouldBeOnCheckoutPage() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/checkout");
    cy.contains("Address Details", { timeout: 10000 }).should("be.visible");
    return this;
  }

  shouldContainProduct(productName) {
    cy.contains("Review Your Order", { timeout: 10000 }).should("be.visible");
    cy.contains("table", productName, { timeout: 10000 }).should("be.visible");
    return this;
  }
}

module.exports = CheckoutPage;
