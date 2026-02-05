import { Navigate, Outlet } from 'react-router-dom';
import { useCompany } from './useCompany';

export function RequireCompany() {
  const { data: company, isLoading } = useCompany();

  if (isLoading) return null;

  if (!company) {
    return <Navigate to="/setup/company" replace />;
  }

  return <Outlet />;
}