import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data); // Set user in global state
  };

  return (
    <form onSubmit={login}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
