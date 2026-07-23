const BasePage = require("./BasePage");

/**
 * Page Object da pagina "/view_cart".
 */
class CartPage extends BasePage {
  open() {
    this.visit("/view_cart");
    return this;
  }

  getCartRows() {
    return cy.get("#cart_info_table tbody tr");
  }

  getProductNames() {
    return cy.get("#cart_info_table tbody tr td.cart_description h4 a");
  }

  shouldContainProduct(productName) {
    this.getProductNames().should(($names) => {
      const texts = [...$names].map((el) => el.textContent.trim());
      expect(texts).to.include(productName);
    });
    return this;
  }

  getQuantityForProduct(productName) {
    return cy
      .contains("#cart_info_table tbody tr", productName)
      .find("td.cart_quantity button");
  }

  proceedToCheckout() {
    cy.contains("a, button", "Proceed To Checkout").click();
    return this;
  }
}

module.exports = CartPage;
