# Sistema de análise visual de objetos em vídeos de vigilância

O sistema foi desenvolvido com intuito de acomodar os mais diversos sitemas de análise visual de objetos em vídeos de vigilância, bem como suas configuracões e dependências.
Ele está previamente configurado para atender o sistema de mestrado desenvolvido pela Cibele.

## Pré-requisitos

* Node na versão mais recente
* Npm  ou yarn na versão mais recente

## Dependências

- `dotenv`: "^6.2.0"
- `express`: "^4.16.4"
- `mongoose`: "^5.4.5"
- `morgan`: "^1.9.1"
- `multer`: "^1.4.1"

## Dependências de Desenvolvimento

- `cors`: "^2.8.5"
- `nodemon`: "^1.18.9"

## Instalando

Antes de rodar a aplicação, é necessário instalar as dependências do projeto. Para isso, execute o seguinte comando no terminal:
`npm install`

## Scripts

O projeto possui os seguintes scripts configurados no arquivo `package.json`:

- `dev`: Inicia o servidor em modo de desenvolvimento utilizando o nodemon para reiniciar automaticamente o servidor quando houver mudanças no código. Para executar, utilize o seguinte comando na pasta ./backend:
`npm run dev`

## 🚀 Inicializacao 

* Arquivo de configurações: Para adicionar qualquer sistema e necessário preencher as configurações corretamente no arquivo config.js

## Monografia de mestrado Cibele

https://repositorio.ufu.br/bitstream/123456789/32812/5/AnaliseVisualComportamento.pdf

## Projeto Cibele
https://github.com/cibelemara/objects-behavior-visual-analysis-system

## Utils

Para startar o server python

python -m http.server 8080




