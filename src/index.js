import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthUserContextProvider } from './context/authUserContext';
import { DarkThemeContextProvider } from './context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUserContextProvider>
      <DarkThemeContextProvider>
        <App />
      </DarkThemeContextProvider>
    </AuthUserContextProvider>
  </React.StrictMode>
);