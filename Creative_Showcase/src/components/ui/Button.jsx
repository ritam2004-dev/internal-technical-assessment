export default function Button({
  children,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="
        w-full px-6 py-3 rounded-xl font-semibold text-white cursor-pointer
        bg-linear-to-r from-blue-600 to-green-600
        hover:from-blue-700 hover:to-green-700
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all shadow-lg hover:shadow-xl
      "
    >
      {children}
    </button>
  );
}
