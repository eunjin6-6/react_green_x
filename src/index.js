import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
//import { authService } from './firebase';
import { BrowserRouter } from 'react-router-dom';

//console.log(authService); //index.js로 이동

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

