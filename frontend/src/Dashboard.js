import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/dashboard', { withCredentials: true })
      .then((response) => setMessage(response.data.message))
      .catch(() => {
        alert('Acesso negado!');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '30rem', padding: '20px', textAlign: 'center' }}>
        <h2>Dashboard</h2>
        <p>{message}</p>
        <Button variant="danger" onClick={handleLogout} className="w-100">
          Logout
        </Button>
      </Card>
    </Container>
  );
}

export default Dashboard;
