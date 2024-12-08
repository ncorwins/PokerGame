// Define the possible hand rankings
export const HandRankings = {
    HIGH_CARD: 0,
    PAIR: 1,
    TWO_PAIR: 2,
    THREE_OF_A_KIND: 3,
    STRAIGHT: 4,
    FLUSH: 5,
    FULL_HOUSE: 6,
    FOUR_OF_A_KIND: 7,
    STRAIGHT_FLUSH: 8,
    ROYAL_FLUSH: 9,
    INVALID: 10
};

// Define a card as an object
interface Card {
    suit: string;
    rank: string;
}

// Function to evaluate the best hand
export function evaluateHand(cards: Card[]): number {

    var isFlush = false;
    var isStraight = false;


    if (cards.length > 5) {
        return 10;
    }
    if (cards.length === 5) {
        isFlush = isFlushHand(cards);
        isStraight = isStraightHand(cards);
    }



    const rankCounts = getRankCounts(cards);
    const pairs = Object.values(rankCounts).filter(count => count === 2).length;
    const threeOfAKind = Object.values(rankCounts).includes(3);
    const fourOfAKind = Object.values(rankCounts).includes(4);

    if (isStraight && isFlush) {
        // Check for Royal Flush (only for straight flushes starting with 10, Jack, Queen, King, Ace)
        if (isRoyalFlush(cards)) {
            return HandRankings.ROYAL_FLUSH;
        }
        return HandRankings.STRAIGHT_FLUSH;
    }

    if (fourOfAKind) {
        return HandRankings.FOUR_OF_A_KIND;
    }

    if (threeOfAKind && pairs > 0) {
        return HandRankings.FULL_HOUSE;
    }

    if (isFlush) {
        return HandRankings.FLUSH;
    }

    if (isStraight) {
        return HandRankings.STRAIGHT;
    }

    if (threeOfAKind) {
        return HandRankings.THREE_OF_A_KIND;
    }

    if (pairs === 2) {
        return HandRankings.TWO_PAIR;
    }

    if (pairs === 1) {
        return HandRankings.PAIR;
    }

    return HandRankings.HIGH_CARD;
}

// Helper function to check if the hand is a flush (5 cards of the same suit)
function isFlushHand(cards: Card[]): boolean {
    const suits = cards.map(card => card.suit);
    return new Set(suits).size === 1;
}

// Helper function to check if the hand is a straight (5 consecutive ranks)
function isStraightHand(cards: Card[]): boolean {
    const ranks = cards.map(card => card.rank);
    const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const sortedRanks = ranks.sort((a, b) => rankOrder.indexOf(a) - rankOrder.indexOf(b));
    const startIndex = rankOrder.indexOf(sortedRanks[0]);

    for (let i = 0; i < 4; i++) {
        if (rankOrder.indexOf(sortedRanks[i + 1]) !== startIndex + i + 1) {
            return false;
        }
    }

    return true;
}

// Helper function to check if the hand is a Royal Flush (Straight Flush with Ace high)
function isRoyalFlush(cards: Card[]): boolean {
    const ranks = cards.map(card => card.rank);
    return ranks.includes('10') && ranks.includes('J') && ranks.includes('Q') && ranks.includes('K') && ranks.includes('A');
}

// Helper function to count the occurrences of each rank in the hand
function getRankCounts(cards: Card[]): Record<string, number> {
    const counts: Record<string, number> = {};
    cards.forEach(card => {
        counts[card.rank] = (counts[card.rank] || 0) + 1;
    });
    return counts;
}
