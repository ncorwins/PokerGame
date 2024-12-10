import Card from './Card.ts';

export class Deck {
    deck: Card[];
    twosRemoved: boolean;

    constructor() {
        this.deck = [];
        this.createDeck();
        this.twosRemoved = false;
    }

    setTwosRemoved(isRemoved: boolean) {
        this.twosRemoved = isRemoved;
    }

    // Method to create the deck with 52 cards
    createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Corresponding values for each rank

        for (let suit of suits) {
            for (let i = 0; i < ranks.length; i++) {
                this.deck.push(new Card(suit, values[i], ranks[i], false, (values[i]-1)));
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
        // If twos are removed, filter out any '2' cards
        const availableCards = this.twosRemoved
            ? this.deck.filter(card => card.rank !== '2')
            : this.deck;

        if (availableCards.length === 0) {
            console.log('No cards left to deal.');
            return null;  // Handle case if no cards are available
        }

        const cardIndex = Math.floor(Math.random() * availableCards.length);
        return availableCards[cardIndex];
    }


    add(card: Card) {
        console.log("Adding card back to the deck:", card);
        //console.log(this.deck.length);
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i].value === card.value && this.deck[i].suit === card.suit) {
                return;
            }
        }
        this.deck.push(card);
    }


    length() {
        return this.deck.length;
    }

    // Method to reset the deck (recreate and shuffle)
    reset() {
        this.deck = [];
        this.createDeck();
        this.shuffle();
    }
}
