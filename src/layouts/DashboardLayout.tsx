import { NavLink, Outlet } from 'react-router-dom';
import { navigation } from '@/app/navigation';
import { supabase } from '@/app/supabase';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 font-bold text-lg border-b">
          Facturación
        </div>

        <nav className="p-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1">
        
        {/* Header */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <span className="text-sm text-gray-500">
            Sistema de Facturación
          </span>

          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
