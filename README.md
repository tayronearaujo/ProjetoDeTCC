# Sistema de análise visual de objetos em vídeos de vigilância

O sistema foi desenvolvido com o intuito de acomodar os mais diversos sistemas de análise visual de objetos em vídeos de vigilância, bem como suas configurações e dependências.
Ele está previamente configurado para atender o sistema de mestrado desenvolvido pela Cibele.

## Pré-requisitos

- Node na versão mais recente
- Npm ou yarn na versão mais recente

## Dependências

- `dotenv`: "^6.2.0"
- `express`: "^4.16.4"
- `mongoose`: "^5.4.5"
- `morgan`: "^1.9.1"
- `multer`: "^1.4.1"

## Dependências de Desenvolvimento

- `cors`: "^2.8.5"
- `nodemon`: "^1.18.9"

## Instalação

Antes de executar a aplicação, é necessário instalar as dependências do projeto. Para isso, execute o seguinte comando no terminal:
`npm install`

## Scripts

O projeto possui os seguintes scripts configurados no arquivo `package.json`:

- `dev`: Inicia o servidor em modo de desenvolvimento utilizando o nodemon para reiniciar automaticamente o servidor quando houver mudanças no código. Para executar, utilize o seguinte comando na pasta ./backend:
`npm run dev`

## Configuração 

Para começar, faça o clone do repositório do projeto Cibele no seguinte [link](https://github.com/cibelemara/objects-behavior-visual-analysis-system). Esse sistema externo já foi previamente configurado neste projeto. 
Porem adicionar o seu próprio sistema, siga as etapas abaixo:

* Faça o clone deste repositório.

* Navegue até a raiz deste projeto.

* Abra o arquivo de configuração `config.js`.

* Adicione as configurações necessárias corretamente para o seu sistema.

## Inicialização 

Apos ter seguido todas as etapas anterios e necessario iniciliar o servidor interno utilizando o arquivo "server.py", Tambem e necessario iniciliar a API esta localizada na pasta backend. Siga as instruções abaixo para iniciar o servidor e estabelecer a integração:

1. Verifique se você possui o Python 3 instalado em seu ambiente.

2. Navegue até o diretório raiz do projeto.

3. Abra o terminal ou prompt de comando.

4. Digite o seguinte comando para iniciar o servidor na porta 8080:

   `python3 server.py`
   
5.  Abra outro terminal ou prompt de comando navegue até o diretóri backend.

6. Digite o seguinte comando para iniciar a API:
`npm run dev`
   

## Monografia de mestrado Cibele

[Link para a monografia de mestrado](https://repositorio.ufu.br/bitstream/123456789/32812/5/AnaliseVisualComportamento.pdf)

## Projeto Cibele

[Link para o GitHub referente projeto Cibele](https://github.com/cibelemara/objects-behavior-visual-analysis-system)
