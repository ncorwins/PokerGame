import * as React from "react";
import { Card } from "./Card.ts"; // Import Card class
import './CardDisplayContainer.css'; // Import styles for individual card display

interface CardDisplayProps {
    card: Card;
    onClick?: () => void; // Make the onClick prop optional
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, onClick }) => {
    // Map the suit to its corresponding symbol
    const getSuitSymbol = (suit: string): string => {
        switch (suit.toLowerCase()) {
            case 'hearts':
                return '♥';
            case 'diamonds':
                return '♦';
            case 'clubs':
                return '♣';
            case 'spades':
                return '♠';
            default:
                return ''; // Fallback if suit is invalid
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
                className={`card ${card.selected ? 'selected' : ''}`}
                onClick={onClick}
                style={{ cursor: 'pointer', borderRadius: '10px' }}
            >
                <div className="card-value">{card.rank}</div>
                <div className={`card-suit ${card.suit.toLowerCase()}`}>
                    {getSuitSymbol(card.suit)}
                </div>
            </div>
            <div className="card-points">{card.points}</div>
        </div>
    );
};

export default CardDisplay;
