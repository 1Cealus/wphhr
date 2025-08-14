'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuth = isAuthenticated();
    const isLoginPage = pathname === '/login';

    if (!isAuth && !isLoginPage) {
      router.push('/login');
    } else if (isAuth && isLoginPage) {
      router.push('/');
    }
  }, [pathname, router]);

  if (!isAuthenticated() && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}