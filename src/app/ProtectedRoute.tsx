import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PageLoader } from '@/components/ui';

export function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) return <PageLoader/>

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
