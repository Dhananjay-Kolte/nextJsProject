'use client'

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const checkAuth = () => {
  if (typeof window !== 'undefined') {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated;
  }
};

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/login');
    }
  }, [router]);

  return checkAuth() ? <>{children}</> : null;
};

export default AuthenticatedRoute;
