import * as React from 'react';
import { GlobalStateProvider } from "./GlobalStateContext.tsx";
import { DeckProvider } from './Deck/DeckContext.tsx';
import CardControls from './CardControls.tsx';
import "./App.css";
import SideButtons from './SideButtons.tsx';
import Store from './Store.tsx';
import { useGlobalState } from './GlobalStateContext.tsx';
import Quests from './Quests.tsx';
import ScoreBox from './ScoreBox.tsx';
import ValuesBar from './ValuesBar.tsx';

const App: React.FC = () => {
    const { gameStarted2 } = useGlobalState();

    return (
            <div className="app-container">
                <SideButtons />
            <div className="content">
                <ValuesBar/>
                    <Store />
                <CardControls />
                <ScoreBox />
                </div>
                <Quests />
            </div>
    );
};

export default App;
