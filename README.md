# Smart Finances  ✨

## Sobre o Projeto

Trata-se de um projeto para controle de finanças, focado no usuário que precisa gerenciar suas despesas, seja ela em Real ou em Dólar, onde ele pode cadastrar novas despesas, gerenciá-las, e receber dicas para ter um melhor controle financeiro.


## Tecnologias e Ferramentas utilizadas 🔥
  - React
  - Next
  - i18next (transalations)
  - Tailwind CSS
  - Node.js (Javascript) 
  - Typescript
  - Mysql
  - Prisma.io
  - JWT (jsonwebtoken)
  - Docker
  - Eslint
  - Env
  - Bcrypt
  - Tremor
  - Joi (validations)




## Executando o projeto 🚀
  
  #### Realize o clone do projeto para sua máquina.
  ```
  git clone git@github.com:MatheusAraujoDev/finances-app.git
  ```

 ## BACKEND

  ### Requisitos ⚙️
    - Docker
    - Nodejs (v18.x)
    - Package managment (npm)


1. Navegue até a pasta do backend usando o comando `cd backend`
2. Execute o comando `npm install`
3. Renomeie o arquivo `.env.example` para `.env`.
4. Inicie o Docker (certifique-se que esteja com o MySql desligado caso tenha instalado, para não dar conflito na porta, para isso vocÊ pode rodar o comando "sudo systemctl stop mysql") e execute os seguintes comandos:
#### Certifique-se de estar na pasta raiz do `backend`

```
docker build -t mysql .
docker run --name finances-container -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
```

5. Sincronize o prisma com o banco de dados usando o seguinte comando:
```
npx prisma db push
```

6. Inicie o servidor do backend usando o comando:
```
npm run dev
```

  ## FRONTEND

1. Navegue até a pasta do frontend usando o comando
```
cd frontend
```
2. Execute o comando
```
npm install
```
3. Execute o comando para iniciar o frontend.
```
npm run dev
```


