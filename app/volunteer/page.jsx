'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VolunteerPage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const lastThrottleRef = useRef(0);
  const router = useRouter();

  const mockVolunteers = [
    { id: 1, name: 'Women Safty' },
    { id: 2, name: 'Halping Hands' },
    { id: 3, name: 'Blood Donations' },
    { id: 4, name: 'cloth Donations' },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const now = Date.now();
    if (now - lastThrottleRef.current < 1000) return; // throttle 1s
    lastThrottleRef.current = now;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const filtered = mockVolunteers.filter(v =>
        v.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }, 500); // debounce delay
  };

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; Max-Age=0; path=/';
    document.cookie = 'role=; Max-Age=0; path=/';
    router.push('/login');
  };

  useEffect(() => {
    setResults(mockVolunteers);
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Volunteer Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search volunteers..."
        value={search}
        onChange={handleSearchChange}
        className="border p-2 rounded w-full mb-4"
      />

      <ul className="list-disc pl-5">
        {results.length > 0
          ? results.map(vol => <li key={vol.id}>{vol.name}</li>)
          : <li>No results found</li>}
      </ul>
    </div>
  );
}
