import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navigation } from '@/app/navigation';
import { supabase } from '@/app/supabase';
import Logo from '@/assets/logo.png';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 w-64 bg-white border-r
          transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-14 px-4 border-b flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8" />
          <span className="font-semibold text-gray-900">
            Facturación
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-2 rounded-md px-3 py-2 text-sm
                transition
                ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `
              }
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4 print:hidden">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <span className="text-sm text-gray-500">
              Sistema de Facturación
            </span>
          </div>

          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
