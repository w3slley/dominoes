export class Deck {
    constructor() {
        this.tiles = [];
    }
    get(pos) {
        return this.tiles[pos];
    }
    addTile(t) {
        this.tiles.push(t);
    }
    removeFirstTile() {
        let removed = this.tiles[0];
        this.tiles.splice(0, 1);
        return removed;
    }
    sortTiles() {
        this.tiles = this.tiles.sort(() => Math.random() - 0.5);
    }
    size() {
        return this.tiles.length;
    }
}
