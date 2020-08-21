import { Tile } from './Tile.js';
import { Hand } from './Hand.js';
import { Deck } from './Deck.js';
import { Board } from './Board.js';
var Game = (function () {
    function Game(players) {
        this.numPlayers = 2;
        this.tilesPerPlayer = 8;
        this.board = new Board();
        this.deck = new Deck();
        this.generateAllTiles();
        this.deck.sortTiles();
        this.players = players;
        this.setPlayersHand();
    }
    Game.prototype.passTurn = function () {
    };
    Game.prototype.setPlayersHand = function () {
        for (var i = 0; i < this.numPlayers; i++) {
            var h = new Hand();
            for (var i_1 = 0; i_1 < this.tilesPerPlayer; i_1++) {
                h.addTile(this.deck.removeFirstTile());
            }
            this.players[i].setHand(h);
        }
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
