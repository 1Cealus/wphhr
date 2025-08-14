'use client';

import { useRouter } from 'next/navigation';
import { login } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if (username) {
      login(username);
      router.push('/');
      router.refresh(); 
    } else {
      alert('Please enter a username.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome!
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Please log in to manage your tasks.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-6"> 
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="e.g., JaneDoe"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}