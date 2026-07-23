# language: pt
Funcionalidade: Consulta de Action na API do Trello
  Como consumidor da API publica do Trello
  Eu quero consultar uma action pelo id
  Para validar o status da resposta e o nome da lista associada

  Cenario: Consultar action e validar o nome da lista
    Quando eu envio um GET para a action "592f11060f95a3d3d46a987a" do Trello
    Entao o status code da resposta deve ser 200
    E o campo "name" da estrutura "list" deve ser exibido
