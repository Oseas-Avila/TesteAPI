// Arquivo de suporte carregado automaticamente antes de cada arquivo de teste.

// Evita que excecoes nao tratadas na aplicacao (fora do controle do teste)
// interrompam a execucao dos cenarios.
Cypress.on("uncaught:exception", () => {
  return false;
});
