import * as React from 'react';
import { useState } from 'react';
import { Deck } from './Deck.ts';
import CardDisplay from './CardDisplay.tsx';
import Card from './Card.ts';
import { evaluateHand, HandRankings } from './handEvaluator.ts';  // Import the evaluator
import './CardDisplayContainer.css';

const CardDisplayContainer: React.FC = () => {
    const [deck] = useState(new Deck());
    const [dealtCards, setDealtCards] = useState<Card[]>([]);
    const [bestHand, setBestHand] = useState<string>('');  // To store the best hand

    const dealCard = () => {
        const card = deck.deal();
        if (card) {
            setDealtCards((prevDealtCards) => [...prevDealtCards, card]);
        } else {
            console.log('No more cards in the deck.');
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

    const shuffle = () => {
        deck.shuffle();
    };

    return (
        <div>
            <h1>Poker Game</h1>
            <button onClick={dealCard}>Deal a Card</button>
            <button onClick={shuffle}>Shuffle</button>
            <button onClick={evaluateBestHand}>Evaluate Best Hand</button>
            <button onClick={() => setDealtCards([])}>Clear Cards</button>

            <h2>Dealt Cards</h2>
            <div className="card-container">
                {dealtCards.map((card, index) => (
                    <CardDisplay
                        key={index}
                        card={card}
                        onClick={() => removeCard(card)} // Pass the removeCard function to handle clicks
                    />
                ))}
            </div>

            <h2>Best Hand: {bestHand}</h2>
        </div>
    );
};

export default CardDisplayContainer;
