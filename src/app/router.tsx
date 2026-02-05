import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RequireCompany } from '@/modules/company/RequireCompany';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ClientsPage } from '@/modules/clients/ClientsPage';
import { CompanySetupPage } from '@/modules/company/CompanySetupPage';
import { LoginPage } from '@/modules/auth/LoginPage';
import { SettingsPage } from '@/modules/settings/SettingsPage';
import { StatesPage } from '@/modules/catalogs/states/StatesPage';
import { CountriesPage } from '@/modules/catalogs/countries/CountriesPage';
import { CitiesAdminPage } from '@/modules/catalogs/cities/CitiesAdminPage';
import { InvoicesPage } from '@/modules/invoices/InvoicesPage';
import { InvoiceFormPage } from '@/modules/invoices/InvoiceFormPage';
import { InvoiceEditPage } from '@/modules/invoices/InvoiceEditPage';
import { InvoiceViewPage } from '@/modules/invoices/InvoiceViewPage';
import { InvoicePrintPage } from '@/modules/invoices/InvoicePrintPage';

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
              { path: '/cities', element: <CitiesAdminPage/> },
              { path: '/states', element: <StatesPage/> },
              { path: '/countries', element: <CountriesPage/> },
              { path: '/clients', element: <ClientsPage /> },    
              { path: '/invoices', element: <InvoicesPage/> },
              { path: '/invoices/new', element: <InvoiceFormPage/> },
              { path: '/invoices/:id', element: <InvoiceViewPage /> },
              { path: '/invoices/:id/edit', element: <InvoiceEditPage /> },
              { path: '/invoices/:id/print', element: <InvoicePrintPage />},
              { path: '/settings', element: <SettingsPage/> },
            ],
          },
        ],
      },
    ],
  },
]);
