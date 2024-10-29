'use client';

import ThreeDSAuthentication from '@/components/ThreeDSAuthentication';
import { AuthMessage } from '@/types/auth-message.type';
import { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [auth, setAuth] = useState<AuthMessage>();
  const [showAuth, setShowAuth] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    setShowAuth(true);
    setLoading(true);
  };

  const authCallback = (payload: AuthMessage) => {
    setLoading(false);
    setAuth(payload);
    setShowAuth(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
      case 'ERROR':
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        3DS Authentication
      </h1>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={onSubmit}>
          <label
            htmlFor="auth-url"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Enter 3DS Authentication URL
          </label>
          <input
            id="auth-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://front-3ds.h4b.dev/authentication/..."
          />
          <button
            type="submit"
            disabled={loading || !url}
            className={`w-full py-3 mt-4 rounded font-semibold transition-colors ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center text-white">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Starting Authentication...
              </span>
            ) : (
              'Start Authentication'
            )}
          </button>
        </form>
      </div>
      {auth && (
        <div className="w-full max-w-lg mt-8 p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-medium">Authentication response:</p>
          <pre
            className={`mt-2 p-3 rounded-lg font-mono text-sm break-words whitespace-pre-wrap ${getStatusColor(auth.Status)}`}
          >
            {JSON.stringify(auth, null, 2)}
          </pre>
        </div>
      )}
      {showAuth && (
        <div className="w-full max-w-lg mt-6 bg-white shadow-lg rounded-lg p-6">
          <ThreeDSAuthentication authUrl={url} onAuthComplete={authCallback} />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
