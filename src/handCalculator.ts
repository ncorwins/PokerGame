import Card from "./Deck/Card";

export function calculateHand(cards: Card[], evaluation: number): number {
    var score = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].selected) {
            score += cards[i].value * (evaluation+1);
        }
    }

    return (score);
}