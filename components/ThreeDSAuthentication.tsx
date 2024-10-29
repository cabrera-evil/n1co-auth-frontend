import { AuthMessage } from '@/types/auth-message.type';
import { useEffect } from 'react';

interface ThreeDSAuthenticationProps {
  authUrl: string;
  onAuthComplete: (params: AuthMessage) => void;
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
        onAuthComplete(payload);
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
      className="w-full rounded border border-gray-300"
    ></iframe>
  );
};

export default ThreeDSAuthentication;
