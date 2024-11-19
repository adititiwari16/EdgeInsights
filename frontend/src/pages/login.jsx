import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api_services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      await loginUser(userData);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#C9E6F0]">
      <h2 className="text-2xl font-bold mb-4 text-[#78B3CE]">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-[#F96E2A] rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-[#F96E2A] rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-[#F96E2A] text-white rounded"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-[#78B3CE] hover:text-[#F96E2A]"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
