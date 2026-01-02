import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-teal-900 text-white">
      <h1 className="animate-pulse text-7xl font-extrabold tracking-tight text-transparent bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text">
        404
      </h1>

      <p className="mt-4 text-lg text-blue-200">Page not found</p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-linear-to-r from-blue-600 to-teal-500 px-6 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:from-blue-500 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        Go Home
      </Link>
    </div>
  );
}
