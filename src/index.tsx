import * as React from "react";
import App from './App.tsx';
import './index.css';
import * as ReactDOM from "react-dom/client"; // Correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);