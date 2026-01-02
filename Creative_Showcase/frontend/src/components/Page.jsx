export default function Page({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">{children}</div>
    </div>
  );
}
