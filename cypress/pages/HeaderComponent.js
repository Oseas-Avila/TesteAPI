/**
 * Componente reutilizavel do cabecalho/menu (usado por varias paginas).
 */
class HeaderComponent {
  isLoggedInAs(name) {
    cy.get(".navbar-nav").contains("Logged in as", { timeout: 10000 });
    if (name) {
      cy.get(".navbar-nav").contains(name);
    }
    return this;
  }

  logout() {
    cy.get('a[href="/logout"]').click();
    return this;
  }

  deleteAccount() {
    cy.get('a[href="/delete_account"]').click();
    return this;
  }
}

module.exports = HeaderComponent;
