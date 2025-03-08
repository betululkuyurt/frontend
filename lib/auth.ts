
export const setAuthTokens = (accessToken: string, refreshToken?: string) => {
    try {
      console.log("🔑 Setting auth tokens...")
      // Set access token
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; samesite=lax`;
      console.log("✅ Access token set")
      // Set refresh token if provided
      if (refreshToken) {
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=86400; samesite=lax`;
        console.log("✅ Refresh token set")
      }
      
      // Trigger storage event for state updates
      window.dispatchEvent(new Event('storage'));
      console.log("📢 Storage event dispatched")
      return true;
    } catch (error) {
      console.error('Error setting auth tokens:', error);
      return false;
    }
  };
  export const authConfig = {
    cookieName: 'auth-token',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 1 hafta
    }
  }
  
  export const logout = () => {
    // 1️⃣ Çerezleri temizle
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  
    // 2️⃣ Navbar güncellensin diye event gönder
    window.dispatchEvent(new Event('authChange'));
  
    console.log("✅ User has logged out (Çerezler temizlendi)");
  };
  
  
  export const isAuth = () => {
    if (typeof window === 'undefined') return false;
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key.trim()] = value;
      return acc;
    }, {} as { [key: string]: string });
    
    return !!cookies['accessToken'];
  };