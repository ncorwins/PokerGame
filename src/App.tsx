import * as React from 'react';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";
import { DeckProvider } from './Deck/DeckContext.tsx';  // Corrected import
import CardControls from './CardControls.tsx';
import "./App.css";
import SideButtons from './SideButtons.tsx';
import Store from './Store.tsx';
import { useGlobalState } from './GlobalStateContext.tsx';
import Quests from './Quests.tsx';
import ScoreBox from './ScoreBox.tsx';
//import AnimatedBox from './notes/AnimatedBox.tsx';

const App: React.FC = () => {

    return (
        <GlobalStateProvider>
            <div className="app-container">
                < SideButtons />
                <div className="content">
                    < Store />
                    < CardControls />
                    <ScoreBox/>
                </div>
                < Quests />
            </div>
        </GlobalStateProvider>
    );
}

export default App;
