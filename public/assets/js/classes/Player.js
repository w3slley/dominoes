var Player = (function () {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setHand = function (hand) {
        this.hand = hand;
    };
    Player.prototype.equal = function (p) {
        return this.name == p.name;
    };
    return Player;
}());
export { Player };
