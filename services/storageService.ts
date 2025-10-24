import { User, LoginMethod } from '../types';

const USER_STORAGE_KEY = 'jalpa-current-user';
const DEFAULT_LOGIN_KEY = 'jalpa-default-login';

export const setStorageItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
};

export const saveCurrentUser = (user: User) => {
  setStorageItem(USER_STORAGE_KEY, user);
};

export const getCurrentUser = (): User | null => {
  return getStorageItem<User>(USER_STORAGE_KEY);
};

export const clearCurrentUser = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const saveDefaultLoginMethod = (method: LoginMethod) => {
  setStorageItem(DEFAULT_LOGIN_KEY, method);
};

export const getDefaultLoginMethod = (): LoginMethod | null => {
  return getStorageItem<LoginMethod>(DEFAULT_LOGIN_KEY);
};
