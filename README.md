

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição


API desenvolvida em [Nest](https://github.com/nestjs/nest) para criação, leitura, edição e remoção de registros de médicos.

## URL da API
```bash
# Via deploy AWS
http://ec2-54-211-137-28.compute-1.amazonaws.com//api/doctors/

# Via localhost
http://localhost:${PORT}/api/doctors/
```

## Documentação Swagger
```bash
# Via deploy AWS
http://ec2-54-211-137-28.compute-1.amazonaws.com//docs

# Via localhost
http://localhost:${PORT}/docs
```



## Rodando a aplicação no Docker
```bash
# criar um arquivo .env.docker na raiz e definir as variáveis de ambiente necessárias para a imagem do Postgres. Exemplo:
DATABASE_URL=postgresql://postgres:postgres@crud_doctors_db:5432/crud_doctors
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_DB=crud_doctors
PORT=5000

# Executar o comando
$ docker-compose up --build
```


## Rodando os testes no Docker
```bash
# Os testes utilizam outro container Postgres específico para testes, por isso certifique-se de criar um arquivo .env.test e definir as variáveis de ambiente do banco de testes. Exemplo:
DATABASE_URL=postgresql://postgres:postgres@crud_doctors_db_test:5432/crud_doctors_test
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_DB=crud_doctors_test
PORT=5000

# Executando testes unitários
$ docker-compose -f docker-compose-tests.yml run crud_doctors_app npm run test

# Executando testes E2E
$ docker-compose -f docker-compose-tests.yml run crud_doctors_app npm run test:e2e
```






## Rodando a aplicação na máquina local
```bash
# Criar um arquivo .env na raiz e inserir as variáveis de ambiente conforme consta no arquivo .env.example

# install
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodando os testes na máquina local

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
