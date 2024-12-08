import * as React from 'react';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";
import { DeckProvider } from './Deck/DeckContext.tsx';  // Corrected import
import CardControls from './CardControls.tsx';
import "./App.css";

const App: React.FC = () => {

    return (
        <GlobalStateProvider>
            <DeckProvider>
                <div className="app-container">
                    <div className="content">
                        < CardControls />
                    </div>
                </div>
            </DeckProvider>
        </GlobalStateProvider>
    );
}

export default App;
