import React, { useState, useEffect } from 'react';
import { LoginMethod } from '../types';
import { getDefaultLoginMethod, saveDefaultLoginMethod } from '../services/storageService';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [defaultMethod, setDefaultMethod] = useState<LoginMethod>(null);

  useEffect(() => {
    setDefaultMethod(getDefaultLoginMethod());
  }, []);

  const handleMethodChange = (method: LoginMethod) => {
    setDefaultMethod(method);
    saveDefaultLoginMethod(method);
  };
  
  const options: { value: LoginMethod; label: string }[] = [
      { value: null, label: 'None (Show all options)' },
      { value: 'google', label: 'Sign in with Google' },
      { value: 'whatsapp', label: 'Continue with WhatsApp' },
      { value: 'mobile', label: 'Use Mobile Number' },
  ]

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <header className="flex items-center p-3 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">Settings</h2>
      </header>
      <main className="flex-1 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Default Login Method</h3>
            <p className="text-sm text-gray-400 mb-4">
                Choose which login screen to show when you open the app.
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                {options.map(option => (
                     <label key={option.label} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="login-method"
                            value={option.value || 'null'}
                            checked={defaultMethod === option.value}
                            onChange={() => handleMethodChange(option.value)}
                            className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
          </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
