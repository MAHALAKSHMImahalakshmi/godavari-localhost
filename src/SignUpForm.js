import React, { useState } from 'react';

function SignUpForm({ onSignUp, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMsg(data.message);
      if (data.success) {
        onSignUp(); // Switch to login after successful signup
      }
    } catch (error) {
      setMsg('Error connecting to server');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>Sign Up</button>
      </form>
      <p>{msg}</p>
      <button onClick={onSwitchToLogin} style={{ marginTop: 10, width: '100%' }}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default SignUpForm;