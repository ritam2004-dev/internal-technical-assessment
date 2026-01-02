export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "danger",
}) {
  if (!isOpen) return null;

  const colors = {
    danger: {
      bg: "bg-red-500",
      hover: "hover:bg-red-600",
      text: "text-red-600",
    },
    warning: {
      bg: "bg-orange-500",
      hover: "hover:bg-orange-600",
      text: "text-orange-600",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
        {/* Icon */}
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colors[type].bg} bg-opacity-10 flex items-center justify-center mx-auto mb-4`}
        >
          <span className="text-2xl sm:text-3xl">
            {type === "danger" ? "⚠️" : "🛡️"}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xl sm:text-2xl font-bold text-center mb-3 ${colors[type].text}`}
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 sm:py-3 ${colors[type].bg} text-white rounded-lg font-medium ${colors[type].hover} transition-colors shadow-lg`}
          >
            {type === "danger" ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
