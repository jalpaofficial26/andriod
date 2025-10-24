import React, { useState, useRef, useEffect } from 'react';
import { saveCurrentUser } from '../services/storageService';
import { MOCK_USERS } from '../data/mock';
import { User } from '../types';

interface OtpVerificationScreenProps {
  loginAttempt: {method: 'whatsapp' | 'mobile', number: string};
  onBack: () => void;
  onLogin: (user: User) => void;
}

const CORRECT_CODE = '123456';

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({ loginAttempt, onBack, onLogin }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleLogin = () => {
    // In a real app, you'd create a new user or find an existing one
    // based on the phone number. Here we just log in as a mock user.
    const loggedInUser = { ...MOCK_USERS[0], isMe: true };
    saveCurrentUser(loggedInUser);
    onLogin(loggedInUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        
        // Move to next input
        if (value !== '' && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        // Check if complete
        const fullCode = newCode.join('');
        if (fullCode.length === 6) {
           if(fullCode === CORRECT_CODE) {
               handleLogin();
           } else {
               setError('Incorrect code. Please try again.');
               setCode(Array(6).fill(''));
               inputsRef.current[0]?.focus();
           }
        } else {
            setError('');
        }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && code[index] === '' && index > 0) {
          inputsRef.current[index - 1]?.focus();
      }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <header className="flex items-center p-3 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">Verification</h2>
      </header>
      <main className="flex-1 flex flex-col items-center pt-10 p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Enter Confirmation Code</h1>
        <p className="text-gray-400 mb-8 max-w-sm">
          Enter the 6-digit code we sent to {loginAttempt.number}.
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
            {code.map((digit, index) => (
                <input
                    key={index}
                    // Fix: The ref callback was implicitly returning a value, which is not allowed. 
                    // Wrapped the assignment in braces to ensure a void return.
                    ref={el => { inputsRef.current[index] = el; }}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 bg-gray-700 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
        </div>
        
        {error && <p className="text-red-400 text-sm">{error}</p>}
        
        <p className="text-sm text-gray-400 mt-8">
            The code is <span className="font-mono text-gray-300">123456</span> for this demo.
        </p>
      </main>
    </div>
  );
};

export default OtpVerificationScreen;