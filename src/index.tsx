import * as React from "react";
import App from './App.tsx';
import './index.css';
import * as ReactDOM from "react-dom/client"; // Correct import
import { useGlobalState } from './GlobalStateContext.tsx';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStateProvider>
                <App />
            </GlobalStateProvider>
  </React.StrictMode>
);