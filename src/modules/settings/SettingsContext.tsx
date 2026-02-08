import { createContext, useContext } from 'react';
import { useSettings } from './useSettings';
import { useCompany } from '@/hooks/useCompany';

type SettingsContextType = {
  companyId: string | null;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data: settings } = useSettings();
  const { data: company } = useCompany();

  return (
    <SettingsContext.Provider
      value={{
        companyId: settings?.company_id ?? company?.id ?? null,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettingsContext must be used inside provider');
  return ctx;
}
