import Card from "./Deck/Card";

export function calculateHand(cards: Card[], evaluation: number, cardDeck: any[]): number {
    var score = 0;
    var multi = evaluation + 1; // update multi as needed


    console.log(cardDeck); // store cards
    console.log(cards);
    console.log(evaluation + 1);

    var tScore = 0;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].selected) {
            score += (cards[i].value-1) * (multi);
        }
    }
    console.log(tScore);

    return (score);
}