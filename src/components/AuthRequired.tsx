import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// AuthRequired wraps protected routes. For local development it's useful to
// bypass auth so pages can be tested without signing in. This component will
// skip the redirect to /login when either:
//  - the app is running on localhost/127.0.0.1, OR
//  - the Vite env var VITE_DISABLE_AUTH is set to 'true'.
// IMPORTANT: Do NOT enable VITE_DISABLE_AUTH in production.
export function AuthRequired({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const disableAuthEnv = (import.meta.env.VITE_DISABLE_AUTH || '').toString() === 'true';
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (disableAuthEnv || isLocalhost) {
    // Bypass auth in dev/local environment
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}