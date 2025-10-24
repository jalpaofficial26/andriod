import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jalpa.chat',
  appName: 'Jalpa',
  webDir: 'dist', // This should match your build output directory
  bundledWebRuntime: false,
};

export default config;
