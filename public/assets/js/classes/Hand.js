var Hand = (function () {
    function Hand() {
        this.tiles = [];
    }
    Hand.prototype.get = function (pos) {
        return this.tiles[pos];
    };
    Hand.prototype.addTile = function (t) {
        this.tiles.push(t);
    };
    Hand.prototype.removeTile = function (t) {
        var index = -1;
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].getHorizontalUnicode() === t.getHorizontalUnicode())
                index = i;
        }
        if (index != -1) {
            var removed = this.tiles[index];
            this.tiles.splice(index, 1);
            return removed;
        }
        else
            return null;
    };
    Hand.prototype.sortTiles = function () {
        this.tiles = this.tiles.sort(function () { return Math.random() - 0.5; });
    };
    Hand.prototype.size = function () {
        return this.tiles.length;
    };
    return Hand;
}());
export { Hand };
