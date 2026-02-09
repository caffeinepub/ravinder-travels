import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
        isAuthenticated
          ? 'bg-muted hover:bg-muted/80 text-foreground'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Logging in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          Login
        </>
      )}
    </button>
  );
}

