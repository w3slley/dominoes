export class Hand {
    constructor() {
        this.tiles = [];
    }
    get(pos) {
        return this.tiles[pos];
    }
    addTile(t) {
        this.tiles.push(t);
    }
    removeTile(t) {
        //loop through the tiles array and remove the item whose getUnicode() yields t.getUnicode();
        let index = -1;
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].getHorizontalUnicode() === t.getHorizontalUnicode())
                index = i;
        }
        if (index != -1) {
            let removed = this.tiles[index];
            this.tiles.splice(index, 1);
            return removed;
        }
        else
            return null;
    }
    sortTiles() {
        this.tiles = this.tiles.sort(() => Math.random() - 0.5);
    }
    size() {
        return this.tiles.length;
    }
}
