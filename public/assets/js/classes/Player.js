export class Player {
    constructor(name) {
        this.name = name;
    }
    //giveUp()
    //getHand()
    passTurn() {
    }
    equal(p) {
        return this.name == p.name; //later I'll have to think on a more precise comparison between players
    }
    getHand() {
        return this.hand;
    }
    setHand(hand) {
        this.hand = hand;
    }
}
