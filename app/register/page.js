'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = () => {
    if (!name || !username || !password) {
      alert('All fields are required');
      return;
    }

    if (
      password.length < 5 ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      alert('Password must be 5 chars, include number & symbol');
      return;
    }

    localStorage.setItem(
      'registeredUser',
      JSON.stringify({ name, username, password, role })
    );

    localStorage.setItem('isRegistered', 'true');

    alert('Registration successful!');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-600">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full border border-gray-300 p-2 mb-3 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Username"
          className="w-full border border-gray-300 p-2 mb-3 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 mb-3 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 p-2 mb-5 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
