'use client';

import { AuthCompleteParams } from '@/types/auth-complete-params.type';
import { useEffect } from 'react';

interface ThreeDSAuthenticationProps {
  authUrl: string;
  onAuthComplete: (params: AuthCompleteParams) => void;
}

const ThreeDSAuthentication: React.FC<ThreeDSAuthenticationProps> = ({
  authUrl,
  onAuthComplete,
}) => {
  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://front-3ds.h4b.dev') return;
      const { MessageType, Status, AuthenticationId, OrderId, OrderAmount } =
        event.data;
      if (
        MessageType === 'authentication.complete' ||
        MessageType === 'authentication.failed'
      )
        onAuthComplete({
          status: Status,
          authId: AuthenticationId,
          orderId: OrderId,
          amount: OrderAmount,
        });
    };
    window.addEventListener('message', handleAuthMessage);
    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, [onAuthComplete]);

  return (
    <iframe
      src={authUrl}
      width="100%"
      height="500px"
      title="3DS Authentication"
      sandbox="allow-scripts allow-same-origin"
      className="w-full rounded border border-gray-300"
    ></iframe>
  );
};

export default ThreeDSAuthentication;
