import React, { useState } from 'react';
import './styles.css';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setLoggedIn(true);
    } else {
      setError(data.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="container">
      {loggedIn ? (
        <div className="dashboard">
          <h1>Bem-vindo(a), {username}!</h1>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default App;
