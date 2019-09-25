# Movie api

Antes de executar o projeto deve ser instaladas as depedências.

```
  $ npm i
```

Caso queira executar em modo de desenvolvimento deve ser criado um arquivo .env.dev e para o ambiente de producação basta utilizar o arquivo .env
as váriaveis de ambientes para serem definidas são as seguintes, caso queira pode executar um container para o PostgreSQL, comando está no package.json

```
  APP_SECRET=

  DB_HOST=
  DB_USER=
  DB_PASS=
  DB_NAME=
```

Ser for necessário buildar o projeto pode executar o comando

```
  $ npm run build
```

Os testes foram desenvovlidos com o Framework Jest, para pode executar os teste deve ser criado um .env.test que deve conter as seguintes informações. A conselhável utilizar o dialéto SQlite para não interferir diretamente no banco.

```
  APP_SECRET=

  DB_HOST=
  DB_USER=
  DB_PASS=
  DB_NAME=

  DB_DIALECT=sqlite
```

```
  $ npm test
```

Projeto está com CI utilizando a plataforma https://buddy.works/ e o servidor está hospedado no ambiente da Digital Ocean