var Player = (function () {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.passTurn = function () {
    };
    Player.prototype.equal = function (p) {
        return this.name == p.name;
    };
    Player.prototype.getHand = function () {
        return this.hand;
    };
    Player.prototype.setHand = function (hand) {
        this.hand = hand;
    };
    return Player;
}());
export { Player };
