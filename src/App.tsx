import * as React from 'react';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";
import DeckComponent from './Deck/DeckComponent.tsx';
import { DeckProvider } from './Deck/DeckContext.tsx';  // Corrected import
import CardDisplayContainer from './Deck/CardDisplayContainer.tsx';
import "./App.css";

const App: React.FC = () => {

    return (
        <GlobalStateProvider>
            <DeckProvider>
                <div className="app-container">
                    <div className="content">
                        < CardDisplayContainer />
                    </div>
                </div>
            </DeckProvider>
        </GlobalStateProvider>
    );
}

export default App;
