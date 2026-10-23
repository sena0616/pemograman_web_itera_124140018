import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BookProvider } from './context/BookContext.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><BookProvider><App /></BookProvider></BrowserRouter>
  </React.StrictMode>
);
