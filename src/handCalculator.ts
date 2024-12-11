import Card from "./Deck/Card";

export const HandRankings = {
    HIGH_CARD: 1,
    PAIR: 2,
    TWO_PAIR: 4,
    THREE_OF_A_KIND: 10,
    STRAIGHT: 12,
    FLUSH: 16,
    FULL_HOUSE: 20,
    FOUR_OF_A_KIND: 80,
    STRAIGHT_FLUSH: 500,
    ROYAL_FLUSH: 5000,
};

export function calculateHand(cards: Card[], evaluation: number, statsArray: any[]): any {
    let score = 0;
    var multi = evaluation; // update multi as needed
    var card_count = 0;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        if (card.selected) {
            card_count += 1;
        }
    }
    if (card_count < 5) {
        multi = 1;
    }
    else if (card_count > 5) {
        multi = 0;
    }
    let globalCardsMulti = 1; // Accumulates all multipliers
    let globalCardsAdder = 0; // Accumulates all adders

    // Retrieve the multipliers and adders from statsArray
    const stats = statsArray[0]; // Assuming statsArray has one object with the required values

    // Log for debugging
    console.log(cards);
    console.log(evaluation + 1);

    // Loop through the cards to calculate the score
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        if (card.selected) {
            // Apply the multiplier and adder based on card type and hand evaluation
            let cardMultiplier = 1;
            let cardAdder = 0;

            // Handle global multipliers and adders
            cardMultiplier *= stats.GLOBAL_MULTIPLIER;
            cardAdder += stats.GLOBAL_ADDER;

            // Handle suit-based multipliers and adders
            switch (card.suit) {//'Hearts', 'Diamonds', 'Clubs', 'Spades'
                case 'Spades':
                    cardMultiplier *= stats.SPADES_MULTIPLIER;
                    cardAdder += stats.SPADES_ADDER;
                    break;
                case 'Clubs':
                    cardMultiplier *= stats.CLUBS_MULTIPLIER;
                    cardAdder += stats.CLUBS_ADDER;
                    break;
                case 'Hearts':
                    cardMultiplier *= stats.HEARTS_MULTIPLIER;
                    cardAdder += stats.HEARTS_ADDER;
                    break;
                case 'Diamonds':
                    console.log("DIAMOND MULTI!");
                    cardMultiplier *= stats.DIAMONDS_MULTIPLIER;
                    cardAdder += stats.DIAMONDS_ADDER;
                    break;
                default:
                    break;
            }

            // Handle hand-based multipliers and adders
            switch (evaluation) {
                case HandRankings.STRAIGHT:
                    cardMultiplier *= stats.STRAIGHT_MULTIPLIER;
                    cardAdder += stats.STRAIGHT_ADDER;
                    break;
                case HandRankings.FLUSH:
                    cardMultiplier *= stats.FLUSH_MULTIPLIER;
                    cardAdder += stats.FLUSH_ADDER;
                    break;
                case HandRankings.FULL_HOUSE:
                    cardMultiplier *= stats.FULL_HOUSE_MULTIPLIER;
                    cardAdder += stats.FULL_HOUSE_ADDER;
                    break;
                case HandRankings.FOUR_OF_A_KIND:
                    cardMultiplier *= stats.FOUR_OF_A_KIND_MULTIPLIER;
                    cardAdder += stats.FOUR_OF_A_KIND_ADDER;
                    break;
                case HandRankings.STRAIGHT_FLUSH:
                    cardMultiplier *= stats.STRAIGHT_MULTIPLIER;
                    cardAdder += stats.STRAIGHT_ADDER;
                    cardMultiplier *= stats.FLUSH_MULTIPLIER;
                    cardAdder += stats.FLUSH_ADDER;
                    break;
                case HandRankings.ROYAL_FLUSH:
                    cardMultiplier *= stats.STRAIGHT_MULTIPLIER;
                    cardAdder += stats.STRAIGHT_ADDER;
                    cardMultiplier *= stats.FLUSH_MULTIPLIER;
                    cardAdder += stats.FLUSH_ADDER;
                    break;
                case HandRankings.HIGH_CARD:
                case HandRankings.PAIR:
                case HandRankings.TWO_PAIR:
                case HandRankings.THREE_OF_A_KIND:
                    // For these hand types, you can either apply a multiplier/additional logic or just leave as is
                    break;
                default:
                    break;
            }

            // Accumulate global values
            globalCardsMulti *= cardMultiplier;
            globalCardsAdder += cardAdder;

            // Calculate the card's score based on the multiplier and adder
            score += (card.value - 1) * multi * cardMultiplier + cardAdder;
        }
    }

    console.log(globalCardsMulti, globalCardsAdder); // For debugging purposes

    return { fullScore: score, handMulti: multi, cardsMulti: globalCardsMulti, cardsAdder: globalCardsAdder };
}
