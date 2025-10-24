import React, { useState } from 'react';

interface PhoneLoginScreenProps {
  method: 'whatsapp' | 'mobile';
  onBack: () => void;
  onProceed: (phoneNumber: string) => void;
}

const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = ({ method, onBack, onProceed }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const details = {
      whatsapp: {
          title: "Continue with WhatsApp",
          icon: (
             <svg viewBox="0 0 24 24" className="w-12 h-12 mb-4 text-[#25D366]" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.55C8.76 21.36 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.71 20.28 11.91C20.28 16.47 16.65 20.1 12.04 20.1C10.53 20.1 9.09 19.68 7.85 18.95L7.4 18.68L4.8 19.45L5.58 16.91L5.3 16.46C4.53 15.14 4.14 13.58 4.14 11.91C4.14 7.35 7.77 3.67 12.04 3.67M9.13 7.89C8.93 7.89 8.76 7.93 8.6 8.24C8.44 8.55 7.94 10 7.94 11.23C7.94 12.45 8.63 13.61 8.76 13.78C8.89 13.95 10.29 16.11 12.45 16.96C14.29 17.68 14.67 17.53 15.04 17.49C15.48 17.43 16.44 16.85 16.64 16.2C16.84 15.55 16.84 15.01 16.77 14.9C16.71 14.79 16.54 14.7 16.25 14.56C15.96 14.42 14.75 13.81 14.5 13.71C14.25 13.61 14.08 13.56 13.91 13.88C13.75 14.19 13.25 14.8 13.12 14.97C12.99 15.14 12.86 15.16 12.6 15.06C12.34 14.96 11.31 14.6 10.08 13.53C9.13 12.71 8.52 11.71 8.39 11.47C8.26 11.23 8.38 11.11 8.51 10.98C8.62 10.87 8.76 10.68 8.89 10.51C9.02 10.34 9.07 10.21 9.17 10.01C9.27 9.81 9.22 9.64 9.17 9.53C9.12 9.42 8.73 8.44 8.6 8.04C8.47 7.64 8.34 7.59 8.21 7.59" />
             </svg>
          ),
          description: "Jalpa will send a confirmation code to your WhatsApp account.",
      },
      mobile: {
          title: "Use Mobile Number",
          icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          ),
          description: "We'll send a one-time code to your mobile number.",
      }
  }
  const currentDetails = details[method];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(phoneNumber.trim().length > 5) {
        onProceed(phoneNumber.trim());
    }
  }

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
       <header className="flex items-center p-3 bg-gray-900/80 backdrop-blur-sm shadow-md z-10">
        <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">{currentDetails.title}</h2>
      </header>
      <main className="flex-1 flex flex-col items-center pt-10 p-6 text-center">
        {currentDetails.icon}
        <h1 className="text-2xl font-bold mb-2">Enter your phone number</h1>
        <p className="text-gray-400 mb-8 max-w-sm">{currentDetails.description}</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <input 
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="w-full bg-gray-700 rounded-lg py-3 px-4 text-white text-center text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
            />
            <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:scale-100">
                Send Code
            </button>
        </form>
      </main>
    </div>
  );
};

export default PhoneLoginScreen;
