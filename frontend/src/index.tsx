import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Modal from "./components/Modal/Modal";

ReactDOM.render(
  <React.StrictMode>
    <Modal/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
