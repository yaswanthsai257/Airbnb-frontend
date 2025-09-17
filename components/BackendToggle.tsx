import React, { useState, useEffect } from 'react';
import { fetchPropertiesFromAPI, checkAPIHealth } from '../services/backendPropertyService';

interface BackendToggleProps {
  onToggle: (useBackend: boolean) => void;
  useBackend: boolean;
}

const BackendToggle: React.FC<BackendToggleProps> = ({ onToggle, useBackend }) => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkStatus = async () => {
      const isHealthy = await checkAPIHealth();
      setApiStatus(isHealthy ? 'online' : 'offline');
    };

    checkStatus();
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online': return 'Backend API Online';
      case 'offline': return 'Backend API Offline';
      default: return 'Checking API...';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-40 bg-white rounded-lg shadow-lg p-4 border">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            apiStatus === 'online' ? 'bg-green-500' : 
            apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useBackend}
            onChange={(e) => onToggle(e.target.checked)}
            disabled={apiStatus === 'offline'}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Use Backend API
          </span>
        </label>
      </div>
      
      {apiStatus === 'offline' && (
        <p className="text-xs text-red-600 mt-2">
          Backend API is offline. Using local data.
        </p>
      )}
    </div>
  );
};

export default BackendToggle;
