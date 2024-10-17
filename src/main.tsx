import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './pages/Auth'; // Importa el AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
