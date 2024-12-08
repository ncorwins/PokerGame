import * as React from 'react';
import Card from './Card.ts';
import { createContext, ReactNode, useState } from 'react';
import { Deck } from './Deck.ts'; // Make sure your Deck class is correctly imported

// Define types for the context
interface DeckContextType {
    deck: Deck;
    dealtCards: Card[];  // Array of dealt cards (could be Card objects, or just card names)
    dealCard: () => void;
    shuffleDeck: () => void;
    resetDeck: () => void;
}

// Create context with default values
const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [deck] = useState(new Deck());
    const [dealtCards, setDealtCards] = useState<Card[]>([]); // Store dealt cards

    const dealCard = () => {
        const card = deck.deal();
        if (card) {
            // Create a new array by spreading the existing dealt cards and adding the new card
            setDealtCards((prevDealtCards) => [...prevDealtCards, card]);
            console.log("Card dealt:", card);
        } else {
            console.log('No more cards in the deck.');
        }
    };

    const shuffleDeck = () => {
        deck.shuffle();
    };

    const resetDeck = () => {
        deck.reset();
        setDealtCards([]); // Clear dealt cards when resetting the deck
    };

    return (
        <DeckContext.Provider value={{ deck, dealtCards, dealCard, shuffleDeck, resetDeck }}>
            {children}
        </DeckContext.Provider>
    );
};

export const useDeck = (): DeckContextType => {
    const context = React.useContext(DeckContext);
    if (!context) {
        throw new Error('useDeck must be used within a DeckProvider');
    }
    return context;
};
