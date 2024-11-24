import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Nếu bạn có file CSS để định dạng
import { AuthProvider } from './Auth_Context';
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
