import React from 'react';

interface AuthScreenProps {
  onNavigate: (screen: 'googleLogin') => void;
  onGuestLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate, onGuestLogin }) => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col justify-between items-center p-6">
      <div className="w-full text-center pt-12">
        <h1 className="text-6xl font-bold tracking-wider">Jalpa</h1>
        <p className="text-blue-300 mt-2">An end-to-end encrypted chat service</p>
      </div>
      
      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => onNavigate('googleLogin')}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5"/>
          Sign in with Google
        </button>

        <div className="flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={onGuestLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Chat with AI
        </button>
      </div>

       <div className="w-full max-w-xs pb-4">
        <p className="text-xs text-center text-gray-400 mt-4">
            By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
