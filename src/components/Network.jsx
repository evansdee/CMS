import { useState, useEffect } from 'react';

function NetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState(null);

  useEffect(() => {
    const updateNetworkStatus = () => {
      if (navigator.connection) {
        setNetworkStatus(navigator.connection.downlink);
      } else {
        console.warn('Network Information API not supported');
        setNetworkStatus('unsupported');
      }
    };

    updateNetworkStatus();

    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  const getNetworkStatusColor = () => {
    if (networkStatus === 'unsupported') return 'gray'; // API not supported
    if (networkStatus === null) return 'gray'; // unknown
    if (networkStatus <= 0.5) return 'red'; // poor network
    if (networkStatus <= 2) return 'yellow'; // stable network
    return 'green'; // good network
  };

  return (
    <div>
      <p>Network Status:</p>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: getNetworkStatusColor(),
        }}
      />
    </div>
  );
}

export default NetworkStatus;
