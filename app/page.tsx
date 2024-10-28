'use client';

import ThreeDSAuthentication from '@/components/ThreeDSAuthentication';
import { AuthCompleteParams } from '@/types/auth-complete-params.type';
import { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  const handleAuthComplete = ({
    status,
    authId,
    orderId,
    amount,
  }: AuthCompleteParams) => {
    setAuthStatus(status);
    setShowAuth(false);
    if (status === 'SUCCESS')
      console.log('Authentication successful, proceed with transaction:', {
        authId,
        orderId,
        amount,
      });
    else if (status === 'FAILED')
      console.log('Authentication failed, please retry.');
    else if (status === 'ERROR' || status === 'EXPIRED')
      console.log('Authentication error or expired.');
  };

  const startAuthentication = () => {
    if (authUrl) setShowAuth(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        3DS Authentication
      </h1>
      <div className="w-full max-w-md">
        <label
          htmlFor="auth-url"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter 3DS Authentication URL
        </label>
        <input
          id="auth-url"
          type="text"
          value={authUrl}
          onChange={(e) => setAuthUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          placeholder="https://front-3ds.h4b.dev/authentication/..."
        />
        <button
          onClick={startAuthentication}
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition-colors"
        >
          Start Authentication
        </button>
      </div>
      {authStatus && (
        <p className="mt-4 text-lg font-medium">
          Authentication status: <span className="font-bold">{authStatus}</span>
        </p>
      )}
      {showAuth && (
        <div className="w-full max-w-md mt-6">
          <ThreeDSAuthentication
            authUrl={authUrl}
            onAuthComplete={handleAuthComplete}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
