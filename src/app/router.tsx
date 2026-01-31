import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RequireCompany } from '@/modules/company/RequireCompany';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ClientsPage } from '@/modules/clients/ClientsPage';
import { CompanySetupPage } from '@/modules/company/CompanySetupPage';
import { LoginPage } from '@/modules/auth/LoginPage';
import { SettingsPage } from '@/modules/settings/SettingsPage';
import { StatesPage } from '@/modules/catalogs/states/StatesPage';
import { CitiesPage } from '@/modules/catalogs/cities/CitiesPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: '/setup/company', element: <CompanySetupPage /> },

      {
        element: <RequireCompany />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/', element: <ClientsPage /> },
              { path: '/cities', element: <CitiesPage/> },
              { path: '/states', element: <StatesPage/> },
              { path: '/clients', element: <ClientsPage /> },    
              { path: '/settings', element: <SettingsPage/> },
            ],
          },
        ],
      },
    ],
  },
]);
