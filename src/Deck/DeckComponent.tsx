import * as React from 'react';
import { useDeck } from './DeckContext.tsx';

const DeckComponent: React.FC = () => {
    const { dealCard, shuffleDeck, resetDeck } = useDeck();

    return (
        <div>
            <button onClick={dealCard}>Deal a Card</button>
            <button onClick={shuffleDeck}>Shuffle Deck</button>
            <button onClick={resetDeck}>Reset Deck</button>
        </div>
    );
};

export default DeckComponent;
