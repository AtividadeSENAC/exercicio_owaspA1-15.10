const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const VALID_USER = 'admin'; // Usuário fixo aceito

app.use(cors({
  origin: 'http://localhost:3001', // Permitindo frontend acessar o backend
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'senha-insegura', // Segredo fraco
  resave: false,
  saveUninitialized: true, // Salvando sessão mesmo sem login completo
  cookie: { maxAge: 60000, httpOnly: true }
}));

// Login vulnerável: IGNORA A SENHA COMPLETAMENTE
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Se o nome de usuário for 'admin', loga independente da senha
  if (username === VALID_USER) {
    req.session.loggedIn = true;
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else {
    return res.status(401).json({ message: 'Usuário não encontrado!' });
  }
});

// Rota protegida, mas com autenticação quebrada
app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    return res.status(200).json({ message: 'Bem-vindo à dashboard!' });
  } else {
    return res.status(401).json({ message: 'Acesso não autorizado!' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
});

// Servidor rodando na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


//##CODIGO CORRIGIDO##//

/*
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Usuário e senha válidos
const VALID_USER = 'admin';
const VALID_PASSWORD = '123456';

app.use(cors({
  origin: 'http://localhost:3001', // Permitindo o frontend acessar o backend
  credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'senha-segura', // Segredo para sessão
  resave: false,
  saveUninitialized: false, // Apenas salva sessão se necessário
  cookie: { maxAge: 60000, httpOnly: true }, // Cookie com tempo de expiração
}));

// Login com validação de usuário e senha
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o nome de usuário e senha estão corretos
  if (username === VALID_USER && password === VALID_PASSWORD) {
    req.session.loggedIn = true; // Define que o usuário está logado
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else {
    return res.status(401).json({ message: 'Usuário ou senha incorretos!' });
  }
});

// Rota protegida para a dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    return res.status(200).json({ message: 'Bem-vindo à dashboard!' });
  } else {
    return res.status(401).json({ message: 'Acesso não autorizado!' });
  }
});

// Rota para logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao realizar logout!' });
    }
    res.status(200).json({ message: 'Logout realizado com sucesso!' });
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

*/