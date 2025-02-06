# Aprovei - Desafio Técnico

Este projeto é uma aplicação web que exibe uma tabela de produtos com informações como código, data, nome, quantidade, preço, total e status.

## Como fazer o download do projeto e executar

1. **Clone o repositório:**
   Abra o terminal e execute o comando abaixo para clonar o repositório do projeto:
   ```bash
   git clone https://github.com/V-Matheus/aprovei-desafio-tecnico.git
   ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd aprovei-desafio-tecnico
    ```

3. **Instale as dependências: Certifique-se de ter o Node.js e o npm ou yarn instalados. Em seguida, execute:**

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn
    ```

3. **Execute o projeto: Para iniciar o projeto, execute:**

     ```bash
    npm start
    ```

    ou

    ```bash
    yarn start
    ```

### Estrutura dos Dados
Os dados dos produtos são armazenados em um objeto `storedData` que contém uma lista de produtos. Cada produto tem propriedades como `code`, `date`, `name`, `quantity`, `price`, `total` e `status`.

### Renderização da Tabela
O código seleciona um elemento HTML com a classe `.table` e preenche seu conteúdo com os dados dos produtos. Ele usa o método `map` para iterar sobre a lista de produtos e gerar o HTML correspondente para cada produto.

### Formatação dos Valores
Os valores de `price` e `total` são formatados para sempre exibir duas casas decimais usando o método `toFixed(2)`.

### Verificação do Status
A cor do texto do status é determinada pela função `verifyStatus`, que retorna uma cor com base no valor do status.

### Exibição Dinâmica
O HTML gerado é inserido no elemento `.table` usando `innerHTML`, o que atualiza a tabela na página web.

Este projeto é útil para visualizar e gerenciar uma lista de produtos de forma organizada e estilizada.

## Páginas do Projeto

### Página Inicial (Loja)
- **Descrição:** Esta é a página principal do projeto, onde tem um formulário para cadastro dos produtos.
- **Funcionalidade:** 
  - Após preencher os dados do produto com o seu nome, preço e quantidade e clicar no botão de adicionar irá salvar os dados no LocalStorage
  - Quando o produto é salvo, além dos dados preenchidos é adicionado automaticamente ao localStorage o código do produto, a data e o total
  - Quando os dados são enviados ele apaga o value dos inputs para que fique preparado para adicionar novos produtos


### Página de produtos
- **Descrição:** Esta é a página onde os produtos são exibidos em uma tabela.
- **Funcionalidade:** 
  - Exibe uma lista de produtos com informações como código, data, nome, quantidade, preço, total e status.
  - Os dados são renderizados dinamicamente a partir do objeto `storedData`.
  - Os valores de `price` e `total` são formatados para exibir duas casas decimais.
  - A cor do status é determinada pela função `verifyStatus`.

### Página de status
- **Descrição:** Esta é a página onde é exibido os status dos produtos em uma formado de Kanban.
- **Funcionalidade:** 
  - Consome os dados vindos do LocalStorage e organiza por cores dependendo do status do produto.
  - Exibe os produtos em colunas diferentes, cada uma representando um status específico.
  - Permite ao usuário visualizar rapidamente o estado de cada produto de forma organizada e visualmente distinta.
  - Com as funções `dragStart`, `dragOver`, `dragLeave` e `drop` permite que o kanbar tenha propriedades de drag-and-drop
  - As funções `dragStart`, `dragOver`, `dragLeave` servem para questões de movimentação dos itens e o `drop` para atualização do estado

## Navegação entre Páginas

### Evento de Clique nos Links
```typescript
link.addEventListener('click', (event) => {
  event.preventDefault();
  const page = (link as HTMLElement).innerText;
  if (page) loadPage(page);
});
```
- **Funcionalidade:** 
    - Adição do Evento de Clique: Cada link de navegação tem um evento de clique associado.
    - Obtenção do Nome da Página: O nome da página é obtido a partir do texto do link clicado.
    - Carregamento da Página: A função loadPage é chamada para carregar e renderizar a página solicitada.