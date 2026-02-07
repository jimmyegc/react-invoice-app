import { Spinner } from './Spinner';

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <Spinner size="lg" />
    </div>
  );
}
