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
app.get('/dashboard', (req, res)



*/

