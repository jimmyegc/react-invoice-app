import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { SettingsProvider } from './modules/settings/SettingsContext';

function App() {
  console.log(import.meta.env.VITE_SUPABASE_URL);

  return (
  <SettingsProvider>

  <RouterProvider router={router} />
  
  </SettingsProvider>);
}

export default App
