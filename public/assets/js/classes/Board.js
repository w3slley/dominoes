var Board = (function () {
    function Board() {
        this.tiles = [];
        this.right = null;
        this.left = null;
    }
    Board.prototype.get = function (pos) {
        return this.tiles[pos];
    };
    Board.prototype.getBoard = function () {
        return this.tiles;
    };
    Board.prototype.makePlay = function (tile, side) {
        if (side === 'left') {
            if (tile.last != this.left)
                tile.flipHorizontally();
            this.left = tile.first;
            this.addLeft(tile);
            return true;
        }
        else if (side === 'right') {
            if (this.right != null && tile.first != this.right)
                tile.flipHorizontally();
            this.right = tile.last;
            this.addRight(tile);
            return true;
        }
        else {
            if (this.left != null && tile.last != this.left) {
                tile.flipHorizontally();
            }
            if (this.left == null && this.right == null) {
                this.left = tile.first;
                this.right = tile.last;
            }
            else {
                this.left = tile.first;
            }
            this.addLeft(tile);
            return true;
        }
    };
    Board.prototype.isMoveValid = function (tile) {
        if (this.left === null && this.right === null)
            return { result: true, side: 'both' };
        else {
            var result = false;
            var side = null;
            if (tile.first == this.right || tile.last == this.right) {
                result = true;
                side = 'right';
            }
            if (tile.first == this.left || tile.last === this.left) {
                if (result)
                    side = 'both';
                else {
                    result = true;
                    side = 'left';
                }
            }
            return { result: result, side: side };
        }
    };
    Board.prototype.size = function () {
        return this.tiles.length;
    };
    Board.prototype.addLeft = function (tile) {
        this.tiles.unshift(tile);
    };
    Board.prototype.addRight = function (tile) {
        this.tiles.push(tile);
    };
    return Board;
}());
export { Board };
