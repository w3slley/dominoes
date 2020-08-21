import { Tile } from './Tile.js';
import { Hand } from './Hand.js';
import { Deck } from './Deck.js';
import { Board } from './Board.js';
var Game = (function () {
    function Game(p1, p2) {
        this.board = new Board();
        this.deck = new Deck();
        this.generateAllTiles();
        this.deck.sortTiles();
        this.player = p1;
        this.computer = p2;
        var h1 = new Hand();
        var h2 = new Hand();
        for (var i = 0; i < 8; i++) {
            h1.addTile(this.deck.removeFirstTile());
            h2.addTile(this.deck.removeFirstTile());
        }
        this.player.setHand(h1);
        this.computer.setHand(h2);
    }
    Game.prototype.getBoard = function () {
        return this.board;
    };
    Game.prototype.getDeck = function () {
        return this.deck;
    };
    Game.prototype.generateAllTiles = function () {
        for (var i = 0, j = 0; j < 28; i++, j++) {
            var num = 127025 + i;
            var horizontalUnicode = '&#' + num + ';';
            var tile = new Tile(horizontalUnicode);
            var repeated = this.hasTile(tile);
            if (!repeated.result)
                this.deck.addTile(tile);
            else
                j--;
        }
    };
    Game.prototype.hasTile = function (tile) {
        for (var i = 0; i < this.deck.size(); i++) {
            if (tile.isEqual(this.deck.get(i))) {
                return { result: true, pos: i };
            }
        }
        return { result: false, pos: null };
    };
    return Game;
}());
export { Game };
