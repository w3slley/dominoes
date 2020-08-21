import { Tile } from './Tile.js';
import { Hand } from './Hand.js';
import { Deck } from './Deck.js';
import { Board } from './Board.js';
export class Game {
    constructor(p1, p2) {
        this.board = new Board();
        this.deck = new Deck();
        this.generateAllTiles();
        this.deck.sortTiles();
        //Adding players
        this.player = p1;
        this.computer = p2;
        //setting player's hand
        let h1 = new Hand();
        let h2 = new Hand();
        for (let i = 0; i < 8; i++) {
            h1.addTile(this.deck.removeFirstTile());
            h2.addTile(this.deck.removeFirstTile());
        }
        this.player.setHand(h1);
        this.computer.setHand(h2);
    }
    getBoard() {
        return this.board;
    }
    getDeck() {
        return this.deck;
    }
    generateAllTiles() {
        for (let i = 0, j = 0; j < 28; i++, j++) {
            let num = 127025 + i;
            let horizontalUnicode = '&#' + num + ';';
            let tile = new Tile(horizontalUnicode);
            let repeated = this.hasTile(tile);
            if (!repeated.result) //if there is no domino tile in the array yet, add it to it
                this.deck.addTile(tile);
            else //if there is, add flippedHorizontalUnicode to this tile (it's the flipped tile)
                j--;
        }
    }
    hasTile(tile) {
        for (let i = 0; i < this.deck.size(); i++) {
            if (tile.isEqual(this.deck.get(i))) {
                return { result: true, pos: i };
            }
        }
        return { result: false, pos: null };
    }
}
