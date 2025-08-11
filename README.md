<div align='center' style='background-color:#fff;'>  
<img src='https://lirp.cdn-website.com/573dc09c/dms3rep/multi/opt/black-powered-by-b9e78ecb-1920w.webp' alt='Play' />
</div>

# Play55: Teste Técnico (Backend Pleno)

## 🎯 Visão geral

Este repositório faz parte do teste técnico para a vaga de **Desenvolvedor Backend Pleno** na **Play55**.

A aplicação é um módulo interno para **gestão de favoritos** de produtos.

Usuários podem registrar contas, visualizar e favoritar produtos disponíveis por meio da integração com uma **API de terceiros**.

### Funcionalidades principais

- Autenticação e registro de contas
- Edição e remoção de contas
- Busca de dados de conta autenticada
- Listagem **paginada** de produtos da API externa (com cache em memória)
- Favoritar e desfavoritar produtos
- Listagem **paginada** de produtos favoritos da conta autenticada

### Etapas de desenvolvimento

Para desenvolver este projeto eu segui um roteiro para manter o projeto organizado e bem arquitetado. Sabendo disso, eu me orientei por meio destas etapas:

1. Análise de requisitos: analisei quais são os requisitos e problemas a serem sanados com esta solução.
2. Projeto do sistema: tive por objetivo pensar em como o sistema funcionaria como um todo, tais como banco de dados, casos de uso, endpoints, entidades de domínio etc. 
Toda esta etapa está disponível em uma página no Notion. Para mais informações, acesse [**clicando aqui**](https://www.notion.so/Play55-backend-pleno-2485044ad16c801583c8de2e6b5b5b06?pvs=21)
3. Implementação do código: desenvolvi o projeto seguindo as orientações definidas nos documentos presentes no Notion.
4. Teste: testei a aplicação como um todo, utilizando de testes automatizados nas partes mais críticas do sistema.
5. Documentação final: escrita deste documento README para informações gerais do projeto, desde breve explicação do sistema, decisões técnicas, como rodar etc.

---

## 🛠 Decisões técnicas

Os requisitos destacam **escalabilidade** e **performance**, por isso adotei as seguintes práticas:

- **✅ Testes automatizados (TDD)**
    
    Desenvolvimento orientado a testes, incluindo testes unitários e de integração, garantindo segurança em evoluções futuras e facilitando a detecção de falhas.
    
- **📂 Arquitetura desacoplada**
    
    Uso de *Clean Architecture*, *Domain-Driven Design* e princípios **SOLID** (especialmente inversão de dependência) para separar camadas e facilitar substituições de implementações no futuro.
    

Apesar do escopo pequeno, eu desenvolvi este projeto demonstrando como eu planejo e trabalho em um projeto, desde as etapas iniciais de extração de requisitos do sistema, projeto, desenvolvimento e implantação do sistema.

Sendo assim, desenvolvi o projeto pensado como parte de um possível ecossistema maior (ex.: e-commerce), visando facilitar futuras expansões.

Para mais dúvidas, estou totalmente aberto a explicar com mais detalhes sobre o processo de desenvolvimento do sistema 😀.

---

## 📚 Tecnologias

- **TypeScript**
- **NestJS**
- **MySQL**
- Prisma
- **Docker**
- **Vitest**

---

## 🚀 Como executar

Para clonar e executar este projeto, é necessário ter o **Git**, **Node.js** e **Docker** instalados em seu dispositivo. Após instalá-los, siga os passos abaixo:

1. Clonar projeto e subir containers do Docker.
    
    ```bash
    # Clonar projeto
    git clone https://github.com/Diounata/teste-play55-backend
    
    cd teste-play55-backend
    
    # Subir os containers do Docker
    docker compose up -d
    ```
    
2. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de ambiente conforme necessário.
3. Instale as dependências do projeto.
    
    ```bash
    # Instalar dependências
    npm install
    ```
    
4. Execute as *migrations* do banco de dados.
    
    ```bash
    npm run prisma:reset
    ```
    
5. Inicie o servidor para ter acesso às rotas da API e à documentação Swagger.
    
    ```bash
    npm run start:dev
    ```
    

---

👨‍💻 Projeto desenvolvido por Jonatham Luz. Para mais informações, contate-me via e-mail em [jonathamcordeiro42@gmail.com](mailto:jonathamcordeiro42@gmail.com)