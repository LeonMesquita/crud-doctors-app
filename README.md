<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

API desenvolvida em [Nest](https://github.com/nestjs/nest) para criação, leitura, edição e remoção de registros de médicos.

## Rodando a aplicação no Docker
```bash
# criar um arquivo .env.docker na raiz e definir as variáveis de ambiente da imagem postgres conforme consta no arquivo .env.example. Exemplo:
DB_PORT=5432
DB_HOST=crud_doctors_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_doctors
DB_CONNECTION=postgresql

# Executar o comando
$ docker-compose up --build
```


## Rodando os testes no Docker
```bash
# criar um arquivo .env.test e inserir as variáveis de ambiente da imagem do banco de testes. Exemplo:
DB_PORT=5432
DB_HOST=crud_doctors_db_tests
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crud_doctors_tests
DB_CONNECTION=postgresql

# Executando testes E2E
$ docker-compose -f docker-compose-tests.yml run crud_doctors_app npm run test:e2e
```


## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
