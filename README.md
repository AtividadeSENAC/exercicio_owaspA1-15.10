Projeto OWASP A2: Demonstração de Broken Authentication com React e Node.js
Este projeto é uma demonstração prática da vulnerabilidade "Broken Authentication" (A2 da OWASP Top 10 2021). A aplicação contém uma implementação inicial vulnerável e uma versão corrigida. O objetivo é mostrar como uma autenticação mal configurada pode permitir acesso indevido.

Índice
Descrição do Projeto
Pré-requisitos
Instalação
Estrutura do Projeto
Passo a Passo
Vulnerabilidade Demonstrada
Correção da Vulnerabilidade
Testes
Licença
Descrição do Projeto
Este projeto é composto por um backend em Node.js/Express e um frontend em React.js. Na versão vulnerável, a senha inserida pelo usuário é ignorada, permitindo acesso indevido. Na versão corrigida, tanto o nome de usuário quanto a senha são validados corretamente.

Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

Node.js (v14 ou superior)
npm (gerenciador de pacotes do Node.js)
Git (para clonar o repositório)
Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/owasp-a2-vulnerabilidade.git
cd owasp-a2-vulnerabilidade
Instale as dependências do backend:

bash
Copiar código
cd backend
npm install
Instale as dependências do frontend:

bash
Copiar código
cd ../frontend
npm install
Estrutura do Projeto
plaintext
Copiar código
owasp-a2-vulnerabilidade/
│
├── backend/             # Código do servidor em Node.js
│   └── server.js        # Código principal do backend
│   └── package.json     # Dependências do backend
│
├── frontend/            # Código do frontend em React.js
│   ├── src/
│   │   └── App.js       # Componente principal da aplicação React
│   └── package.json     # Dependências do frontend
│
└── README.md            # Documentação do projeto
Passo a Passo
1. Iniciando o Backend (Node.js)
Entre na pasta do backend e inicie o servidor:

bash
Copiar código
cd backend
node server.js
O servidor estará rodando em http://localhost:3000.

2. Iniciando o Frontend (React.js)
Entre na pasta do frontend e inicie a aplicação React:

bash
Copiar código
cd ../frontend
npm start
A aplicação será aberta em http://localhost:3001 no navegador.

Vulnerabilidade Demonstrada
A primeira versão do backend contém a seguinte falha:

javascript
Copiar código
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Login vulnerável: Ignora a senha completamente
  if (username === VALID_USER) {
    req.session.loggedIn = true;
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else {
    return res.status(401).json({ message: 'Usuário não encontrado!' });
  }
});
Impacto
Com essa lógica, qualquer pessoa que inserir o nome de usuário correto (admin) terá acesso, independentemente da senha digitada.

Correção da Vulnerabilidade
A vulnerabilidade foi corrigida no código abaixo:

javascript
Copiar código
const VALID_PASSWORD = '123456';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Valida tanto o nome de usuário quanto a senha
  if (username === VALID_USER && password === VALID_PASSWORD) {
    req.session.loggedIn = true;
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else {
    return res.status(401).json({ message: 'Usuário ou senha incorretos!' });
  }
});
Agora, o acesso só será permitido se tanto o nome de usuário quanto a senha estiverem corretos.

Testes
1. Testando a Vulnerabilidade
Inicie o backend com o código vulnerável.
Acesse http://localhost:3001.
Insira:
Usuário: admin
Senha: (qualquer valor ou vazio)
Resultado esperado: Acesso concedido à dashboard mesmo com senha incorreta.

2. Testando a Versão Corrigida
Substitua o código do backend pelo código corrigido.
Reinicie o servidor backend.
Acesse http://localhost:3001.
Insira:
Usuário: admin
Senha: 123456
Resultado esperado: Acesso concedido à dashboard.

Insira uma senha incorreta.
Resultado esperado: Acesso negado com a mensagem "Usuário ou senha incorretos!".