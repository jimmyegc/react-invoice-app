import { CompanySettingsForm } from './CompanySettingsForm';

export function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Configuración</h1>
      <CompanySettingsForm />
    </div>
  );
}
