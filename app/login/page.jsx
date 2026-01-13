'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('registeredUser'));

    if (!user) {
      alert('No user found. Please register first.');
      return;
    }

    if (username !== user.username || password !== user.password) {
      alert('Invalid credentials');
      return;
    }

    document.cookie = 'isLoggedIn=true; path=/';
    document.cookie = `role=${user.role}; path=/`;

    if (user.role === 'admin') router.push('/admin');
    else if (user.role === 'volunteer') router.push('/volunteer');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <input
          placeholder="Username"
          className="w-full border border-gray-300 p-2 mb-3 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 mb-4 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded transition"
        >
          Login
        </button>

        {/* Register link for new users */}
        <p className="text-center text-sm text-gray-600 mt-4">
          New user?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-blue-600 cursor-pointer hover:underline font-medium"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
