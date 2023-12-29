import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { App } from 'components/App/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <BrowserRouter basename='/goit-react-hw-05-movies'>
    <App />
  </BrowserRouter>
</React.StrictMode>);
