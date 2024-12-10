import Card from "./Card";

// Define the possible hand rankings
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

// Function to evaluate the best hand
export function evaluateHand(cards: Card[]): number {

    const isFlush = isFlushHand(cards);
    const isStraight = isStraightHand(cards);
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

    const lowStraight = [0, 0, 0, 0, 0];

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].rank === 'A') {
            lowStraight[0] = 1;
        }
        if (cards[i].rank === '2') {
            lowStraight[1] = 1;
        }
        if (cards[i].rank === '3') {
            lowStraight[2] = 1;
        }
        if (cards[i].rank === '4') {
            lowStraight[3] = 1;
        }
        if (cards[i].rank === '5') {
            lowStraight[4] = 1;
        }
    }

    var lowStraightT = true;

    for (let i = 0; i < lowStraight.length; i++) {
        if (lowStraight[i] !== 1) {
            lowStraightT = false;
        }
    }

    if (lowStraightT) {
        return true;
    }

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
