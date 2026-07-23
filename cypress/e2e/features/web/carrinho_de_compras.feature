# language: pt
Funcionalidade: Compra de produtos no site Automation Exercise
  Como um usuario logado no site automationexercise.com
  Eu quero buscar produtos e adiciona-los ao carrinho
  Para validar o conteudo do carrinho na tela de pagamento

  Contexto:
    Dado que eu possuo uma conta cadastrada no site
    E eu realizo login com as credenciais da conta cadastrada

  Cenario: Buscar um produto e adiciona-lo ao carrinho
    Quando eu busco pelo produto "Dress"
    Entao a pagina deve exibir os resultados da busca
    Quando eu adiciono o primeiro produto encontrado ao carrinho
    E eu sigo para a tela do carrinho
    Entao o produto adicionado deve estar listado no carrinho

  Cenario: Validar produtos do carrinho na tela de pagamento
    Quando eu busco pelo produto "Dress"
    E eu adiciono o primeiro produto encontrado ao carrinho
    E eu sigo para a tela do carrinho
    E eu prossigo para a tela de pagamento
    Entao os produtos do carrinho devem estar visiveis na tela de pagamento
