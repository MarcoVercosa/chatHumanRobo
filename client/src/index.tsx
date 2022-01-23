import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from 'react-redux';
import store from "./store/store"

import './index.css';
import App from './App';


console.log("Index.tsx")

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
