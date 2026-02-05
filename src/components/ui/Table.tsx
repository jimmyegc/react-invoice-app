import type { ReactNode } from 'react';

interface TableProps {
  className?: string;
  children: ReactNode;
}

export function Table({ className, children }: TableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border ${className ?? ''}`}>
      <table className="min-w-full text-sm">
        {children}
      </table>
    </div>
  );
}
