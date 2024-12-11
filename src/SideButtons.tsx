import * as React from 'react';
import './SideButtons.css';
import { useGlobalState } from './GlobalStateContext.tsx';
import { useState } from 'react';
import PlayClick from './sound/PlayClick.tsx';

const Store: React.FC = () => {

    const { setLookingAtStore, hasUnlocked, setHasPlayed, setDoubleQuestMoney, usedDiscards, totalDiscards, setTotalDiscards, roundsCompleted, setRoundsCompleted, globalAnte, setGlobalAnte, globalCardCount, setGlobalCardCount, setGlobalMoney, showPlayButton2, setShowPlayButton2, setGenerateCards, globalPointScore, globalMoney, storeCards, setStoreCards, showBuyButton, setShowBuyButton } = useGlobalState();

    const [helperText, setHelperText] = useState<string>(''); // To store the best hand

    const startingAnte = 25;

        const containerStyle = {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: 'center',
            height: "100vh", // Full viewport height
        };






    return (
        <div className="storeWall">
            <button className="btn flash-slide flash-slide--black" style={{ borderRadius: '10px' }}>Total {Math.round(globalPointScore)}</button>
            <button className="btn flash-slide flash-slide--green" style={{ borderRadius: '10px' }}>${Math.round(globalMoney)} Bank</button>
            <button className="btn flash-slide flash-slide--red" style={{ borderRadius: '10px' }}>${Math.round(globalAnte)} Ante</button>
            {!showPlayButton2 && (
                <button className="btn flash-slide flash-slide--purple" style={{ borderRadius: '10px' }}>Discards ({totalDiscards - usedDiscards}/{totalDiscards})</button>)}
            <h2 className="font-bold" style={{ fontSize: '20px', background: 'none', textAlign: 'center', marginTop: '15px' } }>{helperText}</h2>
        </div >
    );
}

export default Store;
