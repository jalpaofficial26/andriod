import React from 'react';
import { saveCurrentUser } from '../services/storageService';
import { MOCK_USERS } from '../data/mock';
import { User } from '../types';

interface GoogleLoginScreenProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const mockGoogleAccounts = [
    { email: 'emily.rogers@gmail.com', user: MOCK_USERS[1] },
    { email: 'liam.b@outlook.com', user: MOCK_USERS[2] },
    { email: 's.chen@domain.com', user: MOCK_USERS[3] },
];

const GoogleLoginScreen: React.FC<GoogleLoginScreenProps> = ({ onLogin, onBack }) => {

  const handleSelectAccount = (user: User) => {
    const loggedInUser = { ...user, isMe: true };
    saveCurrentUser(loggedInUser);
    onLogin(loggedInUser);
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
       <header className="flex items-center p-3 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">Sign in with Google</h2>
      </header>
      <main className="flex-1 flex flex-col items-center pt-10 p-6">
        <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-12 h-12 mb-4"/>
        <h1 className="text-2xl font-bold mb-2">Choose an account</h1>
        <p className="text-gray-400 mb-8">to continue to Jalpa</p>

        <div className="w-full max-w-sm bg-gray-900 rounded-lg overflow-hidden">
            {mockGoogleAccounts.map(account => (
                <div key={account.email} onClick={() => handleSelectAccount(account.user)} className="flex items-center p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50">
                    <img src={account.user.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <p className="font-semibold">{account.user.name}</p>
                        <p className="text-sm text-gray-400">{account.email}</p>
                    </div>
                </div>
            ))}
             <div className="flex items-center p-4 cursor-pointer hover:bg-gray-700/50">
                <div className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <p className="font-semibold">Use another account</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default GoogleLoginScreen;
