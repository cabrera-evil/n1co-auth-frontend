import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="text-center px-8 py-12 bg-white rounded-xl shadow-xl max-w-md">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-4">Oops! Page not found.</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or might have been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
