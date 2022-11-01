# gerenciamento-bens-cloud2022
Aplicação simplificada de gerenciamento de bens para a disciplina de desenvolvimento para nuvem da UFC em 2022.2

# Executando a aplicação

O backend e frontend da aplicação estão empacotados em containers. Para facilitar a execução, utilizaremos o [docker compose](https://docs.docker.com/compose/), que será responsável por criar as imagens dos containers e executá-los, iniciando toda a aplicação.

## Passo 1 - Clonar projeto

Primeiramente, clone o projeto com o comando `git clone https://github.com/bgvinicius/gerenciamento-bens-cloud2022.git`

## Passo 2 - Executando o projeto

Para executar o projeto, com o docker compose instalado (tipicamente já vem instalado em novas versões do docker), execute o comando abaixo:

`docker compose up` ou `docker-compose up`

O comando acima irá criar as imagens necessárias do projeto, assim como baixar imagens de terceiros que usamos no projeto.

Este comando, irá ficar executando em primeiro plano no terminal, mas é possível executar a aplicação em segundo plano informando a flag `-d` ao final do comando.

Uma vez que as imagens tenham sido baixadas e criadas com sucesso, o projeto é iniciado.

A API do projeto é acessível a partir do endereço `http://localhost:8080` e o frontend é acessível a partir do endereço `http://localhost:3000`.

**PS: Em caso de erro, utilize a flag --build ao final do comando para garantir que as imagens sejam construídas. Caso o erro persista, siga os passos de troubleshooting.**

**PS2: É normal que o comando demore para executar pela primeira vez, pois as dependências precisam ser instaladas e não estão cacheadas ainda em sua máquina.**

---

# Sobre o projeto

O projeto inicialmente foi construído para demonstrar uso de tecnologias de nuvem, como:

- AWS
- EC2
- AWS RDS
- DynamoDB
- S3

Além disso, o backend é feito em Spring Boot, e o frontend com React, sendo servido pelo Nginx. O banco relacionado escolhido foi o postgres.

A segunda fase do projeto, usa docker e docker compose para orquestrar a aplicação. 

Para tal, substituímos o S3 pelo Minio, e o DynamoDB usamos uma imagem do [DynamoDBLocal](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) mantida pela própria Amazon.

O Minio possui API compatível com o S3, de modo que foram necessárias mudanças mínimas em configurações para fazer o código funcionar com o Minio.


# Comandos úteis

## Criando apenas imagens 

Para criar apenas as imagens do projeto, basta usar o comando `docker compose build` ou `docker-compose build`.

## Parando containers

Para parar os containers em execução, use o comando `docker compose stop` ou `docker-compose stop`.

## Removendo containers

Para remover os containers parados, use o comando `docker compose rm` ou `docker-compose rm`.

# Troubleshooting

Em caso de erros ao tentar usar o comando `docker compose up` diretamente, siga os passos abaixo:

## 1 - Parando todas instâncias

Use o comando `docker compose stop` ou `docker-compose stop`

## 2 - Remover containers

Use o comando `docker compose rm` ou `docker-compose rm` para remover os containers antigos

## 3 - Criar imagens novas

Use o comando `docker compose build` ou `docker-compose build` para criar novas imagens dos serviços

## 4 - Executar aplicação

Use o comando `docker compose up` ou `docker-compose up` para executar a aplicação. 

Por fim, verifique que tudo está funcionando corretamente.

