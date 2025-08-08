
'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export default function AuthInitializer() {
  const checkAuth = useUserStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
}
