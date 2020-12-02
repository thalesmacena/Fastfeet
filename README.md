# Fastfeet
Aplicação de uma Transportadora Ficticia (Back-end, Front-end e Mobile) utilizando Node.JS, React e React Native, um desafio proposto pela Rocketseat Education, como parte de seu bootcamp.

## Back-end
O back-end foi feito utilizando Express.js, ele também utiliza o padrão de arquitetura MVC com o Sequelize, integrando Postgres como banco de dados e Redis para os background jobs. Além disso o projeto utiliza o padrão de estilo do Airbnb que junto com o plugin do prettier garantem um código limpo e claro.

### Rodando a aplicação

**Pré Requisitos**

Para rodar o aplicato você vai precisar ter instalado:

- Uma versão atualizada do Node.JS
- O Gerenciador de pacotes Yarn ou NPM
- Uma imagem do Postgres e do redis (é recomendável que utilize Docker para ter uma imagem desses banco de dados).
- Uma conta em um smtp (Recomendo o Mailtrap que é gratuito e para desenvolvimento)
- A extensão do VS Code Humao.Rest-Client ou um Client de API como o Insomnia
- Uma cópia deste repositório localmente

**Rodando a aplicação**

1. Acesse a pasta do Back-end e renomeie o arquivo `.env.example` para `.env`, altere as variaveis de ambiente com as credencias do passo a passo.
2. Utilize o seguinte comando para baixar as dependencias:

```
yarn
```

3. Utilize o seguinte comando para realizar as migrations do banco de dados:

```
yarn sequelize db:migrate
```

4. Utilize o seguinte comando para popular o banco de dados com o primeiro administrador:

```
yarn sequelize db:seed:all
```

5. Utilize o seguinte comando para rodar o projeto:

```
yarn dev
```

6. Utilize o seguinte comando para rodar as filas de background jobs:

```
yarn queue
```

7. Utilize a extesão abrindo os arquivos .http da pasta `src/requests` ou utilize essas requisições como base no seu client de API

### Documentação da API

Para vizualizar a documentação da API utilize o seguinte comando:
```
yarn api
```

Esse comando ira renderizar a documentação da api em `localhost:8080`
