import React from 'react';
import { StatusBar } from 'expo-status-bar';

// Provider để bọc project
import { AppProvider } from './src/store/AppContext.js';

// NatigationContainer để bọc project
import { NavigationContainer } from '@react-navigation/native'


// giao diện chính
import Index from './src/Index.js';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
      <StatusBar hidden={true} />
    </AppProvider>
  );
};