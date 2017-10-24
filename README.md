# [Conte Um Conto] Backend API
* * *

Veja a [Documetação](https://conteumconto.github.io/api.conteumconto.com/ "Docs")

## Informações Gerais
es6 + oopjs + MVC Style Classes
Estrutura de diretórios:

``` bash
.
|-build/ # build da api
|-src /
  |-controllers/ # todas as resource controllers
  |
  |-database/ # database conection classes
  |
  |-models/ # model classes para interagir com os dados
    
    |-schemas/ # model schemas

  |-routes/ # arquivos de rota
  |
|-test/ # testes devem entrar aqui
|
|index.js # bootstrap da API
```

### Processo de Desenvolvimento
``` bash
# Clone o repositório git@github.com:luandryl/api.conteumconto.com.git
git clone

# Para as dependencias
npm install

# Serve com hotreload em localhost:3000 para desenvolvimento
npm run dev

#Roda todos os testes escritos dentro de './test' 
npm run test

# Nova branch com a funcionalidade que o dev vai desenvolver. Ex: Professor_Store
git checkout -b Professor_Resource

#Commit na sua feature funcionando com todos os testes funcionando
git add .
git commit -m 'professor resource working'
git push origin Professor_Resource


# Abra um pull request explicando sua funcionalidade e espere outro dev dar merge pra versão estavel.
# Caso queria continuar desenvolvendo enquanto espera o pull request ser fechado crie outra branch.
```
* * *
### Processo de Construção(Build)

Em breve ...
* * *
### Processo de Testes(Build)

O ambiente de testes esta configurado com:
+ [Mocha](https://mochajs.org/):
  * framework js pra testes
+ [Chai](http://chaijs.com/):
  * assertion lib to js

Todos os testes devem ser escritos dentro do diretório `./test` sepando os arquivos por contexto

``` bash
# Clone o repositório git@github.com:luandryl/api.conteumconto.com.git
git clone

# Para as dependencias
npm install

# Serve com hotreload em localhost:3000 para desenvolvimento
npm run dev

#Roda todos os testes escritos dentro de './test' 
npm run test

#Apenas abra um pull request quando todos os testes tiverem passando
```