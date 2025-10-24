import React, { useState, useEffect, useCallback } from 'react';
import { Chat, ChatMode, User } from './types';
import { getCurrentUser, clearCurrentUser, getDefaultLoginMethod } from './services/storageService';
import AndroidFrame from './components/AndroidFrame';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import GoogleLoginScreen from './components/GoogleLoginScreen';
import SettingsScreen from './components/SettingsScreen';
import { App as CapacitorApp } from '@capacitor/app';


type Screen =
  | 'auth'
  | 'home'
  | 'chat'
  | 'settings'
  | 'googleLogin';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>('auth');
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [guestMode, setGuestMode] = useState(false);

  const handleBack = useCallback(() => {
    if (screen === 'chat') {
        setActiveChat(null);
        if(guestMode) {
          handleLogout();
        } else {
          setScreen('home');
        }
    } else if (['settings', 'googleLogin'].includes(screen)){
        setScreen(currentUser ? 'home' : 'auth');
    } else if (screen === 'home') {
        CapacitorApp.exitApp();
    }
  }, [screen, guestMode, currentUser]);


  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setScreen('home');
    } else {
        const defaultLogin = getDefaultLoginMethod();
        if (defaultLogin === 'google') setScreen('googleLogin');
    }

    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        handleBack();
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
        CapacitorApp.removeAllListeners('backButton');
    }
  }, [handleBack]);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setScreen('home');
  }, []);

  const handleGuestLogin = useCallback(() => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: `Guest${Math.floor(Math.random() * 1000)}`,
      avatar: `https://i.pravatar.cc/150?u=guest`,
      isMe: true,
    };
    setCurrentUser(guestUser);
    setGuestMode(true);
    setScreen('chat');
  }, []);

  const handleLogout = useCallback(() => {
    clearCurrentUser();
    setCurrentUser(null);
    setActiveChat(null);
    setGuestMode(false);
    setScreen('auth');
  }, []);

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
    setScreen('chat');
  }, []);

  const handleNavigate = (targetScreen: Screen) => {
      setScreen(targetScreen);
  }

  const renderContent = () => {
    if (!currentUser && !guestMode) {
       switch(screen) {
           case 'googleLogin':
               return <GoogleLoginScreen onLogin={handleLogin} onBack={handleBack} />;
           case 'auth':
           default:
               return <AuthScreen onNavigate={handleNavigate} onGuestLogin={handleGuestLogin} />;
       }
    }

    switch(screen) {
        case 'home':
            return <HomeScreen user={currentUser!} onSelectChat={handleSelectChat} onLogout={handleLogout} onNavigateToSettings={() => setScreen('settings')} />;
        case 'chat':
             return (
                <ChatScreen
                  user={currentUser!}
                  chat={activeChat}
                  chatMode={guestMode ? ChatMode.GUEST : (activeChat?.type === 'GROUP' ? ChatMode.ACCOUNT : ChatMode.PERSONAL)}
                  onBack={handleBack}
                />
              );
        case 'settings':
            return <SettingsScreen onBack={handleBack} />;
        default:
             return <HomeScreen user={currentUser!} onSelectChat={handleSelectChat} onLogout={handleLogout} onNavigateToSettings={() => setScreen('settings')} />;
    }
  };

  return <AndroidFrame>{renderContent()}</AndroidFrame>;
};

export default App;
