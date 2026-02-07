import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bienvenido
          </h1>
          <p className="text-sm text-gray-500">
            Inicia sesión para continuar con tu facturación
          </p>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.64 0 6.64 5.38 2.7 13.22l7.98 6.2C12.58 13.09 17.9 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.64-.15-3.21-.43-4.73H24v9.01h12.7c-.55 2.97-2.21 5.48-4.7 7.18l7.24 5.62C43.47 36.64 46.5 30.9 46.5 24z"
            />
            <path
              fill="#FBBC05"
              d="M10.68 28.42A14.5 14.5 0 019.9 24c0-1.53.27-3.01.78-4.42l-7.98-6.2A23.9 23.9 0 000 24c0 3.88.93 7.55 2.7 10.78l7.98-6.36z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.9-2.13 15.87-5.82l-7.24-5.62c-2.01 1.35-4.59 2.15-8.63 2.15-6.1 0-11.42-3.59-13.32-8.58l-7.98 6.36C6.64 42.62 14.64 48 24 48z"
            />
          </svg>
          Continuar con Google
        </button>

        <p className="text-xs text-center text-gray-400">
          Al continuar aceptas nuestros términos y políticas de privacidad
        </p>
      </div>
    </div>
  );
}
