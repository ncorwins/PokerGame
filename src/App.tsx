import * as React from 'react';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";
import "./App.css";

function App() {

    return (
        <GlobalStateProvider>
            <div className="app-container">
                <div className="content">Test
                </div>
            </div>
        </GlobalStateProvider>
    );
}

export default App;
