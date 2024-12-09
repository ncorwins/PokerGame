import * as React from 'react';
import { useState } from 'react';
import { useGlobalState } from './GlobalStateContext.tsx';
import './Store.css';

const Store: React.FC = () => {
    const { storeCards, setStoreCards, showPlayButton2, setShowBuyButton } = useGlobalState();

    const setSelected = (card: any) => {
        const updatedCards = storeCards.map(c =>
            c === card ? { ...c, selected: true } : { ...c, selected: false }
        );
        setStoreCards(updatedCards);
        setShowBuyButton(false);
        for (let i = 0; i < updatedCards.length; i++) {
            if (updatedCards[i].selected) {
                setShowBuyButton(true);
            }
        }
    };

    if (showPlayButton2) {
        return (
            <div className="store-card-container">
                {storeCards.map((card, index) => (
                    <div
                        key={index}
                        className={`store-card ${card.purchased ? 'purchased' : card.selected ? 'selected' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(card)} // Handle card click
                    >
                        <div className="store-card-name">
                            {card.name}
                        </div>
                        <div className="store-card-desc">
                            {card.desc}
                        </div>
                        <div className="store-card-cost">
                            ${card.cost}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    else {
        return (
            <div className="store-card-container">

            </div>
        );
    }


};

export default Store;
