import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SelectingContextProvider } from './store/select-context';
import { ReservationContextProvider } from './store/reservation-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SelectingContextProvider>
      <ReservationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReservationContextProvider>
    </SelectingContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
