export default function Input({ label, error, ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-teal-700 font-medium">{label}</label>}

      <input
        {...props}
        className="
          w-full px-4 py-3 rounded-xl border-2
          border-blue-200 focus:border-teal-500
          focus:outline-none transition-colors
          bg-blue-50/40
        "
      />

      {error && <p className="text-teal-600 text-sm">⚠️ {error}</p>}
    </div>
  );
}
