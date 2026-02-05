import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { SettingsProvider } from './modules/settings/SettingsContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  //console.log(import.meta.env.VITE_SUPABASE_URL);

  return (
  <SettingsProvider>
    <RouterProvider router={router} />
    <div className='print:hidden'>    
      <ReactQueryDevtools />  
    </div>
  </SettingsProvider>);
}

export default App
