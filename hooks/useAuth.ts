import { useState, useEffect } from 'react';
import { isAuth, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(isAuth());
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth); // 🔥 Güncellenmiş event
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const signOut = () => {
    console.log("🔴 signOut fonksiyonu çağrıldı!");
    logout(); // 🔥 Tek logout çağrısı
    setIsAuthenticated(false);
    router.push("/auth/login"); // ✅ Yönlendirme burada
  };

  return { isAuthenticated, isLoading, signOut };
};
