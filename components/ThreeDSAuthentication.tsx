import { AuthMessage } from '@/types/auth-message.type';
import { AuthParams } from '@/types/auth-params.type';
import { useEffect } from 'react';

interface ThreeDSAuthenticationProps {
  authUrl: string;
  onAuthComplete: (params: AuthParams) => void;
}

const ThreeDSAuthentication: React.FC<ThreeDSAuthenticationProps> = ({
  authUrl,
  onAuthComplete,
}) => {
  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      const trustedOrigin = new URL(authUrl).origin;
      if (event.origin !== trustedOrigin) return;

      try {
        const payload: AuthMessage = JSON.parse(event.data);
        const { MessageType, Status, AuthenticationId, OrderId, OrderAmount } =
          payload;
        if (
          MessageType === 'authentication.complete' ||
          MessageType === 'authentication.failed'
        ) {
          onAuthComplete({
            status: Status,
            authId: AuthenticationId,
            orderId: OrderId,
            amount: OrderAmount,
          });
        }
      } catch (error) {
        console.error('Failed to parse message data:', error);
      }
    };
    window.addEventListener('message', handleAuthMessage);
    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, [authUrl, onAuthComplete]);

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
