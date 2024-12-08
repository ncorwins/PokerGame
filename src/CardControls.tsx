import * as React from 'react';
import { useState } from 'react';
import { Deck } from './Deck/Deck.ts';
import Card from './Deck/Card.ts';
import { evaluateHand, HandRankings } from './Deck/handEvaluator.ts';  // Import the evaluator
import { useGlobalState } from "./GlobalStateContext.tsx";
import './Deck/CardDisplayContainer.css';
import CardDisplay from './Deck/CardDisplay.tsx';

const CardControls: React.FC = () => {
    const [deck] = useState(new Deck());
    const [dealtCards, setDealtCards] = useState<Card[]>([]);
    const [bestHand, setBestHand] = useState<string>('');  // To store the best hand
    var { globalCardCount, setGlobalCardCount } = useGlobalState();  // To store the best hand

    const dealCards = () => {
        if (dealtCards.length == 0) {
            setDealtCards([]);
            deck.reset();
            for (let i = 0; i < globalCardCount; i++) {
                deck.shuffle();
                const card = deck.deal();
                setDealtCards((prevDealtCards) => [...prevDealtCards, card]);
            }
        }
        else {
            for (let i = dealtCards.length; i < globalCardCount; i++) {
                deck.shuffle();
                const card = deck.deal();
                setDealtCards((prevDealtCards) => [...prevDealtCards, card]);
            }
        }

    };

    const evaluateBestHand = () => {
        const handRank = evaluateHand(dealtCards);
        const handName = Object.keys(HandRankings).find(key => HandRankings[key as keyof typeof HandRankings] === handRank);
        setBestHand(handName || 'High Card');
    };

    const removeCard = (cardToRemove: Card) => {
        // Remove the clicked card from the dealt cards list
        deck.add(cardToRemove);

        setDealtCards(prevDealtCards =>
            prevDealtCards.filter(card => card.rank !== cardToRemove.rank || card.suit !== cardToRemove.suit)
        );
    };

    const discardSelected = () => {
        // Create a copy of the dealtCards to avoid direct mutation
        let holder = [...dealtCards];

        // Iterate over the dealt cards and remove selected ones
        for (let i = 0; i < holder.length; i++) {
            if (holder[i].selected) {
                console.log(holder[i]);

                // Remove the selected card from the holder
                holder.splice(i, 1);
                i--; // Decrement the index to account for the shifted array after removal
            }
        }

        // Update the state with the modified cards
        setDealtCards(holder);
    };

    const setSelected = (card: Card) => {
        const updatedCards = dealtCards.map(c =>
            c === card ? { ...c, selected: !c.selected } : c
        );
        setDealtCards(updatedCards);
    };

    return (
        <div>
            <button onClick={dealCards}>Deal Cards</button>
            <button onClick={discardSelected}>Discard</button>
            <div className="card-container">
                {dealtCards.map((card, index) => (
                    <CardDisplay
                        key={index}
                        card={card}
                        onClick={() => setSelected(card)}
                    />
                ))}
            </div>

            <h2>Best Hand: {bestHand}</h2>
        </div>
    );
};

export default CardControls;
