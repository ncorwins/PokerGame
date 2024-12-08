export default class Card {
    suit: string;
    value: number;
    rank: string;
    keep: boolean;

    constructor(suit: string, value: number, rank: string, keep: boolean) {
        this.suit = suit;
        this.value = value;
        this.rank = rank;
        this.keep = keep;
    }
}
