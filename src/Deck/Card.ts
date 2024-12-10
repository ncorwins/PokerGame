export default class Card {
    suit: string;
    value: number;
    rank: string;
    selected: boolean;
    points: number;

    constructor(suit: string, value: number, rank: string, selected: boolean, points: number) {
        this.suit = suit;
        this.value = value;
        this.rank = rank;
        this.selected = selected;
        this.points = points;
    }
}
