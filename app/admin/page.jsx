'use client';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; Max-Age=0; path=/';
    document.cookie = 'role=; Max-Age=0; path=/';
    router.push('/login');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <p className="mt-4">This page is protected. Only admins can see this.</p>
    </div>
  );
}
