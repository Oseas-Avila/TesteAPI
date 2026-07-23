# language: pt
Funcionalidade: Login no site Automation Exercise
  Como um usuario do site automationexercise.com
  Eu quero realizar login
  Para acessar minha conta e comprar produtos

  Contexto:
    Dado que eu possuo uma conta cadastrada no site

  Cenario: Login com credenciais validas
    Quando eu realizo login com as credenciais da conta cadastrada
    Entao eu devo ver que estou logado com sucesso

  Cenario: Login com credenciais invalidas
    Quando eu realizo login com o email "usuario_invalido_qa@teste.com.br" e senha "senhaErrada123"
    Entao uma mensagem de erro de login deve ser exibida
