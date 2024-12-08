import Card from './Card.ts';

export class Deck {
    deck: Card[];

    constructor() {
        this.deck = [];
        this.createDeck();
    }

    // Method to create the deck with 52 cards
    createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Corresponding values for each rank

        for (let suit of suits) {
            for (let i = 0; i < ranks.length; i++) {
                this.deck.push(new Card(suit, values[i], ranks[i], false));
            }
        }
    }

    // Method to shuffle the deck (using Fisher-Yates algorithm)
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; // Swap elements
        }
    }

    // Method to deal a card from the deck
    deal(): Card | undefined {
        return this.deck.pop();
    }

    add(card) {
        this.deck.push(card);
    }

    // Method to reset the deck (recreate and shuffle)
    reset() {
        this.deck = [];
        this.createDeck();
        this.shuffle();
    }
}
