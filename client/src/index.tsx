import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from 'react-redux';
import store from "./store/store"

import './index.css';
import App from './App';
import Chat from "../src/chat/chat/chat"

console.log("Index.tsx")

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
