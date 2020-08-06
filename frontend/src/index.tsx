import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import idReducer from './redux/store'

ReactDOM.render(
  <Provider store={idReducer}>
    <App />
  </Provider>,
  document.getElementById('root')
);
