'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout, isAuthenticated } from '../lib/auth';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  if (pathname === '/login' || !isAuth) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">Task Manager</Link>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}