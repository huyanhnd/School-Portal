import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorProvider } from './contexts/ErrorContext';
import ErrorBox from './components/ErrorBox';
import 'antd/dist/reset.css'; // hoặc css tùy theme

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <BrowserRouter>
        <ErrorBox />
        <App />
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);