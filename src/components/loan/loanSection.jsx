export default function LoanSection({ title, children }) {
  const hasAnyContent = Array.isArray(children)
    ? children.some(Boolean)
    : Boolean(children);

  if (!hasAnyContent) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-md font-semibold text-gray-700 uppercase">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}
