📚 API Clínica – Documentação Oficial
Este repositório contém uma API RESTful para uma clínica, permitindo registro e login de usuários, além de CRUD de agendamentos de consultas.
O projeto segue boas práticas de arquitetura, autenticação JWT, integração com MongoDB Atlas e documentação com Swagger (OpenAPI 3.0).


📂 Estrutura do Projeto
API_REST
 ┣ config/
 │ ┗ db.js
 ┣ controllers/
 │ ┣ appointment.controller.js
 │ ┣ auth.controller.js
 │ ┗ task.controller.js
 ┣ docs/
 │ ┗ swagger.yaml
 ┣ middlewares/
 │ ┣ auth.middleware.js
 │ ┗ error.middleware.js
 ┣ models/
 │ ┣ appointment.model.js
 │ ┣ task.model.js
 │ ┗ user.model.js
 ┣ routes/
 │ ┣ appointment.routes.js
 │ ┣ auth.routes.js
 │ ┗ task.routes.js
 ┣ utils/
 │ ┗ jwt.js
 ┣ validators/
 │ ┣ index.js
 ┣ tests/
 │ ┗ auth.test.js
 ┣ app.js
 ┣ server.js
 ┣ package.json
 ┣ jest.config.js
 ┣ jest.setup.js
 ┗ README.md


🚀 Como Executar o Projeto
1️⃣ Instalar dependências
npm install


2️⃣ Configurar Variáveis de Ambiente (.env)

Crie um arquivo .env na raiz:
PORT=3000
MONGO_URI=<sua-url-do-mongodb-atlas>
JWT_SECRET=<sua-chave-secreta>

🔹 NÃO é necessário instalar MongoDB localmente.
A API funciona apenas com MongoDB Atlas.


3️⃣ Iniciar o servidor
Modo desenvolvimento (nodemon):
npm run dev


📘 Documentação da API
O Swagger é carregado automaticamente pela API, usando o arquivo:
docs/swagger.yaml

Acesse via navegador em:
👉 http://localhost:3000/api-docs

🔐 Autenticação
A API utiliza JWT Bearer Token


📌 Rotas da API (Resumo)
🔹 Autenticação (/auth)
Método	Rota	Descrição
POST	/auth/register	Registrar usuário
POST	/auth/login	Login e geração de token

🔹 Agendamentos (/appointments)
Método	Rota	Descrição
GET	/appointments	Listar agendamentos
POST	/appointments	Criar agendamento
GET	/appointments/:id	Buscar por ID
PUT	/appointments/:id	Atualizar
DELETE	/appointments/:id	Remover


🧪 Rodando os Testes
A API possui testes com Jest + Supertest.
Para rodar:
npm run test


📦 Principais Dependências
Pacote  -	Descrição
express	-  Framework web principal
mongoose  -  ODM para MongoDB
jsonwebtoken  -  Autenticação via JWT
bcrypt  -  Hash de senhas
cors  -  Liberação de acesso externo
swagger-ui-express  -  Interface Swagger
yamljs  -  Leitor do swagger.yaml
jest  -  Testes automatizados
supertest  -  Testes de integração


👥 Integrantes do Grupo
Nome e Função
Ana Luísa Sales: Desenvolvimento da API, autenticação, validações, documentação Swagger
Paola Barbuio: Modelagem, testes, rotas, organização do projeto


📌 Divisão de Tarefas
🔹 Ana Luísa
Configuração inicial do projeto
Autenticação: Criar esquema de validação (Joi) para Auth
Autenticação: Criar utilitário de JWT
Agendamentos: Criar rotas de agendamento
Agendamentos: Criar controller de agendamentos
Criar middleware global de erros
Documentação: Configurar Swagger

🔹 Paola
Banco de Dados
Autenticação - Criar rotas de autenticação
Agendamentos: Criar validações de agendamento (Joi)
Criar rotas de tarefas
Tarefas: Criar controller de tarefas
Criar testes básicos de API


📜 Licença
Projeto desenvolvido para fins acadêmicos – uso educacional.