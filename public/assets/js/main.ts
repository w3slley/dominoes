import {Game} from './classes/Game.js';
import {Player} from './classes/Player.js';
import {createPlayersHand} from './lib/aux.js';

let p1 = new Player('Weslley');
let pc = new Player('Computer');
let game = new Game(p1, pc);
const playerTiles = document.querySelector('.player');
const computerTiles = document.querySelector('.computer');
const boardTiles = document.querySelector('.board');

createPlayersHand();

export {game, playerTiles, computerTiles, boardTiles};
