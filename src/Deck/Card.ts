export default class Card {
    suit: string;
    value: number;
    rank: string;
    selected: boolean;

    constructor(suit: string, value: number, rank: string, selected: boolean) {
        this.suit = suit;
        this.value = value;
        this.rank = rank;
        this.selected = selected;
    }
}
