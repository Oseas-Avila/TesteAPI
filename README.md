# Teste de Automação — Web + API (Cypress + Cucumber + POO)

Framework de automação de testes construído com **Cypress**, **Cucumber** (BDD) e **JavaScript**,
seguindo o padrão **Page Object Model (POO)** para os testes Web e um **Client (POO)** para os testes de API.

## Tecnologias

- **JavaScript**
- **Cypress** (`^13.x`)
- **Cucumber** via `@badeball/cypress-cucumber-preprocessor`
- Bundler `esbuild` (`@bahmutov/cypress-esbuild-preprocessor`)

## Desafios cobertos

### Web — [automationexercise.com](https://www.automationexercise.com)

> O site `automationpractice.com` sugerido no enunciado está fora do ar; foi utilizado o site
> similar `automationexercise.com`, também recomendado como alternativa no enunciado.

- **Login** — [cypress/e2e/features/web/login.feature](cypress/e2e/features/web/login.feature)
  - Como o site não possui a conta fixa citada no enunciado, cada cenário cria (via UI) uma conta
    de teste nova com e-mail único e realiza o login com essas credenciais logo em seguida,
    validando também o cenário de login com credenciais inválidas.
- **Buscar produtos / Incluir no carrinho / Validar carrinho na tela de pagamento** —
  [cypress/e2e/features/web/carrinho_de_compras.feature](cypress/e2e/features/web/carrinho_de_compras.feature)

### API — Trello

- [cypress/e2e/features/api/trello.feature](cypress/e2e/features/api/trello.feature): `GET /1/actions/592f11060f95a3d3d46a987a`,
  validando o `status code` da resposta e exibindo o campo `name` da estrutura `list` (`response.body.data.list.name`).

## Estrutura do projeto

```
cypress/
├── api/
│   └── TrelloApiClient.js        # Client (POO) para chamadas à API do Trello
├── pages/                        # Page Objects (POO) das telas do site
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── AccountInformationPage.js
│   ├── HeaderComponent.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── e2e/
│   ├── features/
│   │   ├── web/
│   │   │   ├── login.feature
│   │   │   └── carrinho_de_compras.feature
│   │   └── api/
│   │       └── trello.feature
│   └── step_definitions/
│       ├── common/auth.steps.js  # Cadastro de usuário, login e hooks (Before/After)
│       ├── web/carrinho.steps.js
│       └── api/trello.steps.js
└── support/
    └── e2e.js
cypress.config.js
package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (inclui o `npm`)

## Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
npm install
```

## Execução dos testes

Rodar toda a suíte em modo headless (usado em CI):

```bash
npm test
```

Abrir o Cypress em modo interativo (recomendado para acompanhar visualmente os testes Web):

```bash
npm run cypress:open
```

Rodar apenas os testes Web:

```bash
npm run test:web
```

Rodar apenas o teste de API:

```bash
npm run test:api
```

Rodar em um navegador específico (ex.: Chrome) ou em modo "headed" (com interface visível):

```bash
npm run test:chrome
npm run test:headed
```

## Relatórios

Os resultados de cada execução ficam disponíveis no terminal (Mochawesome/Cucumber JSON podem ser
plugados facilmente ao projeto, caso deseje evoluir os relatórios). Screenshots de falhas são
salvos automaticamente em `cypress/screenshots/`.

## Observações de design

- **Page Object Model / POO**: cada página do site é representada por uma classe (`cypress/pages`),
  encapsulando seletores e ações; os *step definitions* apenas orquestram chamadas a esses objetos,
  sem conhecer detalhes de implementação da UI.
- **Client de API (POO)**: `TrelloApiClient` encapsula a chamada HTTP à API do Trello, retornando a
  resposta para ser validada nos *steps*.
- **Massa de dados dinâmica**: como o e-mail de teste sugerido no enunciado pertence ao
  `automationpractice.com` (indisponível), o step `Dado que eu possuo uma conta cadastrada no site`
  cria uma conta nova a cada execução (e-mail único via timestamp) e remove essa conta ao final do
  cenário (`After` hook), mantendo os testes independentes e idempotentes.
