var Deck = (function () {
    function Deck() {
        this.tiles = [];
    }
    Deck.prototype.get = function (pos) {
        return this.tiles[pos];
    };
    Deck.prototype.addTile = function (t) {
        this.tiles.push(t);
    };
    Deck.prototype.removeFirstTile = function () {
        var removed = this.tiles[0];
        this.tiles.splice(0, 1);
        return removed;
    };
    Deck.prototype.sortTiles = function () {
        this.tiles = this.tiles.sort(function () { return Math.random() - 0.5; });
    };
    Deck.prototype.size = function () {
        return this.tiles.length;
    };
    return Deck;
}());
export { Deck };
