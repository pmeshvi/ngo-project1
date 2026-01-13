'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const isLoggedIn = cookies.find(c => c.startsWith('isLoggedIn='));
    const roleCookie = cookies.find(c => c.startsWith('role='));
    if (isLoggedIn) {
      if (roleCookie?.split('=')[1] === 'volunteer') router.push('/volunteer');
      else if (roleCookie?.split('=')[1] === 'admin') router.push('/admin');
      else router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    // Set login cookie
    document.cookie = 'isLoggedIn=true; path=/';
    if (role) {
      document.cookie = `role=${role}; path=/`;
      if (role === 'volunteer') router.push('/volunteer');
      else if (role === 'admin') router.push('/admin');
    } else {
      document.cookie = 'role=; path=/';
      router.push('/dashboard'); // default dashboard if no role
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-700 mb-4"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 mb-6"
        >
          <option value="">Select Role (Optional)</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
