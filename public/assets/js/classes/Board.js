export class Board {
    constructor() {
        this.tiles = [];
        this.right = null;
        this.left = null;
    }
    get(pos) {
        return this.tiles[pos];
    }
    getBoard() {
        return this.tiles;
    }
    makePlay(tile, side) {
        if (side === 'left') {
            if (tile.last != this.left)
                tile.flipHorizontally();
            this.left = tile.first; //updating left value with current tile
            this.addLeft(tile);
            return true;
        }
        else if (side === 'right') {
            if (this.right != null && tile.first != this.right)
                tile.flipHorizontally();
            this.right = tile.last; //pdating right value with current tile
            this.addRight(tile);
            return true;
        }
        else { //When users can choose the side, this else code will never be executed (there can only be two valid plays: left and right). Right now it is because I didn't implement the buttons yet.
            if (this.left != null && tile.last != this.left) {
                tile.flipHorizontally();
            }
            if (this.left == null && this.right == null) { //only for the first move (even this will be removed later)
                //updating left and right value with current tile
                this.left = tile.first;
                this.right = tile.last;
            }
            else {
                //temporarily adding to the left
                this.left = tile.first;
            }
            this.addLeft(tile);
            return true;
        }
    }
    isMoveValid(tile) {
        if (this.left === null && this.right === null)
            return { result: true, side: 'both' };
        else {
            let result = false;
            let side = null;
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
            return { result, side };
        }
    }
    size() {
        return this.tiles.length;
    }
    addLeft(tile) {
        this.tiles.unshift(tile);
    }
    addRight(tile) {
        this.tiles.push(tile);
    }
}
