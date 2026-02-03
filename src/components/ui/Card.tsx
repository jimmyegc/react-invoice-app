type CardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Card({ title, description, children, footer }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {(title || description) && (
        <div className="px-6 pt-6 pb-4 border-b">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="p-6">{children}</div>

      {footer && (
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
}
