import { supabase } from '@/app/supabase';

export function LoginPage() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <button onClick={loginWithGoogle}>
        Iniciar sesión con Google
      </button>
    </div>
  );
}
