const BasePage = require("./BasePage");

/**
 * Page Object da pagina "/products" (listagem, busca e adicao ao carrinho).
 */
class ProductsPage extends BasePage {
  open() {
    this.visit("/products");
    return this;
  }

  searchProduct(term) {
    cy.get("#search_product").clear().type(term);
    cy.get("#submit_search").click();
    return this;
  }

  getSearchedProductsTitle() {
    return cy.contains(".title.text-center", "Searched Products", { timeout: 10000 });
  }

  getAllProductCards() {
    return cy.get(".features_items .product-image-wrapper");
  }

  addProductToCartByIndex(index = 0) {
    cy.get(".features_items .product-image-wrapper")
      .eq(index)
      .trigger("mouseover")
      .within(() => {
        cy.get("a.add-to-cart").first().click({ force: true });
      });
    return this;
  }

  addProductToCartByName(productName) {
    cy.contains(".product-image-wrapper", productName)
      .trigger("mouseover")
      .within(() => {
        cy.get("a.add-to-cart").first().click({ force: true });
      });
    return this;
  }

  continueShopping() {
    cy.get(".modal.show, #cartModal.show").should("be.visible");
    cy.get("button.close-modal").click();
    return this;
  }

  goToCartFromModal() {
    cy.get('#cartModal a[href="/view_cart"]').click();
    return this;
  }
}

module.exports = ProductsPage;
